import os
from flask import Blueprint, jsonify, request
import stripe
from stripe.error import SignatureVerificationError
from flask_jwt_extended import jwt_required, get_jwt_identity

from apps import db
from apps.home.models import User 

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
webapp_url = os.getenv('WEB_APP_URL')

blueprint = Blueprint('payment', __name__)


@blueprint.route('/webhook', methods=['POST'])
def webhook():
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']
    print("STRIPE SIGN", request.headers['STRIPE_SIGNATURE'])
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        print(f"Received event: {event['type']}")  # Debug output
    except ValueError as e:
        print(f"ValueError: {str(e)}")  # Debug output
        return jsonify({'error': 'Invalid payload'}), 400
    except SignatureVerificationError as e:
        print(f"SignatureVerificationError: {str(e)}")  # Debug output
        return jsonify({'error': 'Invalid signature'}), 400
    except Exception as e:
        print(f"Unhandled exception: {str(e)}")  # Catch other exceptions
        return jsonify({'error': 'An error occurred'}), 500

    # Handle subscription events
    if event['type'] == 'customer.subscription.created':
        subscription = event['data']['object']
        handle_subscription_created(subscription)
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        handle_subscription_updated(subscription)
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        handle_subscription_canceled(subscription)

    return jsonify(success=True)


def handle_subscription_created(subscription):
    user = User.query.filter_by(stripe_customer_id=subscription['customer']).first()
    if user:
        user.subscription_status = 'active'
        user.stripe_subscription_id = subscription['id']  # Save the subscription ID if necessary
        db.session.commit()
    print("Subscription created:", subscription)


def handle_subscription_updated(subscription):
    user = User.query.filter_by(stripe_customer_id=subscription['customer']).first()
    if user:
        user.subscription_status = 'active' if subscription['status'] == 'active' else 'past_due'
        db.session.commit()
    print("Subscription updated:", subscription)


def handle_subscription_canceled(subscription):
    user = User.query.filter_by(stripe_customer_id=subscription['customer']).first()
    if user:
        user.subscription_status = 'canceled'
        db.session.commit()
    print("Subscription canceled:", subscription)

# Create a new checkout session for the user
@blueprint.route('/create-checkout-session', methods=['POST'])
@jwt_required()  
def create_checkout_session():
    try:
        user_id = get_jwt_identity()  
        user = User.query.get(user_id)
        print(user)

        # If the user does not exist, return a 404 error
        if user is None:
            return jsonify({"message": "User not found."}), 404

        data = request.json
        price_id = data.get('priceId')

        if not price_id:
            return jsonify({"message": "Price ID is required."}), 400

        print(f"Price ID: {price_id}")  # Debug output

        # Create the checkout session for the user
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            mode='subscription',
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            customer=user.stripe_customer_id,  # Assuming the user has a Stripe customer ID
            # Redirect URLs
            success_url=os.getenv('WEB_APP_URL') + '/payment/success',
            cancel_url=os.getenv('WEB_APP_URL') + '/payment/cancel',
        )

        return jsonify({'id': session.id})
    except Exception as e:
        print(f"Error creating checkout session: {str(e)}")  # Debug output
        return jsonify(error=str(e)), 403