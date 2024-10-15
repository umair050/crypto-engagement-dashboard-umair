from flask_login import UserMixin

from apps import db, login_manager

from apps.authentication.util import hash_pass

from sqlalchemy import ARRAY, Float  # Add the necessary imports
from datetime import datetime


class CoinData(db.Model):
    __tablename__ = 'coin_data'
    id = db.Column(db.Integer, primary_key=True)
    coin = db.Column(db.String)
    mentions = db.Column(db.Integer)
    market_cap = db.Column(db.Float)
    virality_score = db.Column(db.Float)
    sentiment_score = db.Column(db.String)
    hype_to_market_cap = db.Column(db.Float)
    one_month_prediction = db.Column(ARRAY(Float))  # Changed to ARRAY
    one_year_prediction = db.Column(ARRAY(Float)) 
    bot_ratio = db.Column(db.Float)
    engagement_coefficient = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 

    def to_dict(self):
        return {
            "coin":self.coin,
            "mentions":self.mentions,
            "market_cap":self.market_cap,
            "virality_score":self.virality_score,
            "sentiment_score":self.sentiment_score,
            "hype_to_market_cap":self.hype_to_market_cap,
            "one_month_prediction":self.one_month_prediction,
            "one_year_prediction":self.one_year_prediction,
            "bot_ratio":self.bot_ratio,
            "engagement_coefficient":self.engagement_coefficient,
            "created_at":self.created_at
        }
        
class Coins(db.Model):
    __tablename__ = 'coins'
    id = db.Column(db.Integer, primary_key=True)
    coin = db.Column(db.String)

    def to_dict(self):
        return {
            "coin":self.coin
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    subscription_status = db.Column(db.String(20), nullable=False, default='inactive')
    stripe_subscription_id = db.Column(db.String(100), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'subscription_status': self.subscription_status,
            'stripe_subscription_id': self.stripe_subscription_id,
        }
    
    def __repr__(self):
        return f'<User {self.username}>'

