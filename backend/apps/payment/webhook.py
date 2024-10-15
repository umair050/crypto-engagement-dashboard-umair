from flask import Blueprint, jsonify, request
from payment.models import User
from app import db
import stripe
from config import Config

stripe.api_key = Config.STRIPE_SECRET_KEY
endpoint_secret = Config.STRIPE_WEBHOOK_SECRET

webhook_bp = Blueprint('webhook', __name__)

@webhook_bp.route('/webhook', methods=['POST'])
def webhook():
    payload = request.data
    sig_header = request.headers.get('STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400

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
    user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
    if user:
        user.subscription_status = 'active'
        db.session.commit()

def handle_subscription_updated(subscription):
    user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
    if user:
        user.subscription_status = 'active' if subscription['status'] == 'active' else 'past_due'
        db.session.commit()

def handle_subscription_canceled(subscription):
    user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
    if user:
        user.subscription_status = 'canceled'
        db.session.commit()
