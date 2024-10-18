from flask_login import UserMixin

from apps import db, login_manager

from apps.authentication.util import hash_pass

from sqlalchemy import ARRAY, Float  # Add the necessary imports
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    subscription_status = db.Column(db.String(20), nullable=False, default='inactive')
    stripe_subscription_id = db.Column(db.String(100), nullable=True)