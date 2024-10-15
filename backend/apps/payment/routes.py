from flask import Blueprint, jsonify, request
from payment.models import User
from app import db
import stripe
from config import Config

stripe.api_key = Config.STRIPE_SECRET_KEY

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/create-subscription', methods=['POST'])
def create_subscription():
    data = request.json
    email = data.get('email')

    # Create Stripe customer
    customer = stripe.Customer.create(
        email=email,
        name=data.get('name')
    )

    # Create Stripe subscription
    subscription = stripe.Subscription.create(
        customer=customer.id,
        items=[{'price': 'your_stripe_price_id'}],  # Replace with your price ID
        expand=['latest_invoice.payment_intent']
    )

    # Store user and subscription in database
    new_user = User(email=email, stripe_subscription_id=subscription['id'], subscription_status='active')
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'subscription_id': subscription['id'], 'status': 'active'})

@payment_bp.route('/user/<int:user_id>/subscription-status', methods=['GET'])
def get_subscription_status(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'email': user.email, 'status': user.subscription_status})
    return jsonify({'error': 'User not found'}), 404
