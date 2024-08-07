# alpha_calculation.py

import pandas as pd
import numpy as np
from .utils import COIN, INTERACTIONS, INTERACTIONS_PATH

def alpha_calculation(interactions) -> pd.Series:
    n = interactions.groupby(COIN)[INTERACTIONS].sum()
    L1, L2, L3 = [n[k].sum() for k in INTERACTIONS]
    N = n.sum().sum()
    n_c = interactions.groupby(COIN)[INTERACTIONS].sum().sum(axis=1)
    v_c = interactions.groupby(COIN).apply(lambda x: x[['num_tweets']].T.dot(x.followers_count)).num_tweets
    return ((N/ L1) * n_c.div(v_c)).sort_values()

def fetch_alphas():
    interactions = pd.read_parquet(INTERACTIONS_PATH)
    print('interactions',interactions)
    return alpha_calculation(interactions=interactions)




def create_dummy_data():
    # Define the number of rows for the dummy data
    num_rows = 10

    # Create dummy data
    data = {
        'coin': np.random.choice(['btc', 'eth', 'xrp','sol'], size=num_rows),
        'like_count': np.random.randint(0, 1000, size=num_rows),
        'reply_count': np.random.randint(0, 500, size=num_rows),
        'retweet_count': np.random.randint(0, 300, size=num_rows),
        'num_tweets': np.random.randint(1, 1000, size=num_rows),  # Add num_tweets column
        'followers_count': np.random.randint(100, 5000, size=num_rows),  # Add this column

    }

    # Create a DataFrame
    df = pd.DataFrame(data)

    # Display the first few rows of the DataFrame
    print(df.head())

    # Save the DataFrame to a Parquet file with gzip compression
    df.to_parquet(INTERACTIONS_PATH, compression='gzip')

    return 'dummy data created'



