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
   
    # Handle divide by zero by replacing zero values with NaN
    L1 = L1 if L1 != 0 else 1
    v_c = v_c.replace(0, 1)  # Replace zeros in v_c with 1
    # Calculate engagement coefficient, handling potential NaN values
    result_series = (N / L1) * n_c.div(v_c)

    # Sort values and return the first valid result
    result_series = result_series.sort_values()

    # Return the top value, or NaN if the Series is empty
    return result_series.iloc[0] if not result_series.empty else float('nan')


def fetch_alphas(engagement_data_list):
    # interactions = pd.read_parquet(INTERACTIONS_PATH)
    print(engagement_data_list)
    interactions = pd.DataFrame(engagement_data_list)
    return alpha_calculation(interactions=interactions)




