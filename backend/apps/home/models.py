from flask_login import UserMixin

from apps import db, login_manager

from apps.authentication.util import hash_pass

class CoinData(db.Model):
    __tablename__ = 'coin_data'
    id = db.Column(db.Integer, primary_key=True)
    coin = db.Column(db.String)
    mentions = db.Column(db.Integer)
    market_cap = db.Column(db.Float)
    virality_score = db.Column(db.Float)
    sentiment_score = db.Column(db.String)
    hype_to_market_cap = db.Column(db.Float)
    one_month_prediction = db.Column(db.Float)
    one_year_prediction = db.Column(db.Float)
    bot_ratio = db.Column(db.Float)

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
            "bot_ratio":self.bot_ratio
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
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'