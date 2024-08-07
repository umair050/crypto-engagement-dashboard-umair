# config.py

import os

ROOT = os.path.dirname(os.path.abspath(__file__))
COIN = 'coin'
INTERACTIONS = ['like_count', 'reply_count', 'retweet_count']
INTERACTIONS_PATH = os.path.join(ROOT, 'data/interactions.parquet.gz')
