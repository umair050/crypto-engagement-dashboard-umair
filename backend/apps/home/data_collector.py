import requests
#import pandas as pd
import os
from dotenv import load_dotenv
from datetime import datetime
import time
from textblob import TextBlob

from .models import CoinData, Coins, db
from .analytics import fetch_alphas
import botometer, tweepy
import re, json


MAX_TWITTER_RESULTS = os.getenv('MAX_TWITTER_RESULTS')
DELAY_BETWEEN_EACH_TWITTER_API_CALL = os.getenv('DELAY_BETWEEN_EACH_TWITTER_API_CALL')


load_dotenv()
# Initialize the sentiment analyzer
max_observed_score=0
# Twitter API bearer token
bearer_token = os.getenv('BEARER_TOKEN2')
# For botometer
rapidapi_key = os.getenv('RAPIDAI_KEY')

openai_like_api_url = os.getenv('OPENAI_API_URL')
openai_like_api_key = os.getenv('OPENAI_API_KEY')

coinmarket_key = os.getenv('COINMARKET_KEY')

bomx = botometer.BotometerX(rapidapi_key=rapidapi_key)
bot_threshold = 0.4

def create_search_url(keyword):
    query = f"query={keyword}&tweet.fields=lang,entities&max_results=10"
    url = f"https://api.twitter.com/2/tweets/search/recent?{query}"
    return url

def connect_to_endpoint(url, params=None):
    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "User-Agent": "v2TweetLookupPython"
    }

    print(headers)
    print(url)
    response = requests.get(url, headers=headers, params=params)

    print('line 51',response)

    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()

def save_coins_to_db(coins):
    db.session.query(Coins).delete()
    db.session.commit()
    print("Saving coins to database...")
    for coin in coins:
        if (len(coin) == 3):
            existing_coin = Coins.query.filter_by(coin=coin).first()
            if not existing_coin:
                new_coin = Coins(coin=coin)
                db.session.add(new_coin)
                print(f"Added new coin: {coin}")
    db.session.commit()
    print("All coins have been saved to the database.")

def discover_new_coins(keywords=["crypto"]):
    print("Discovering new coins...")
    coin_mentions = {}

    for keyword in keywords:
        print(f"Searching for keyword: {keyword}")
        url = create_search_url(keyword)
        json_response = connect_to_endpoint(url)
        for tweet in json_response.get("data", []):
            if 'entities' in tweet and 'hashtags' in tweet['entities']:
                for hashtag in tweet['entities']['hashtags']:
                    coin = hashtag['tag'].lower()
                    if coin in coin_mentions:
                        coin_mentions[coin] += 1
                    else:
                        coin_mentions[coin] = 1

    sorted_coins = sorted(coin_mentions.items(), key=lambda item: item[1], reverse=True)
    top_coins = [coin for coin, mentions in sorted_coins[:50]]
    print("Discovered coins:", top_coins)
    save_coins_to_db(top_coins)
    return top_coins

def convert_unix_to_mmdd(unix_timestamp):
    utc_time = datetime.utcfromtimestamp(unix_timestamp)
    return utc_time.strftime('%m-%d')

def get_historical_data(coin_symbol, start_date=None, limit=30):
    print(f"Getting historical data for {coin_symbol} from CryptoCompare...")
    print(start_date)
    if start_date:
        end_timestamp = int(datetime.strptime(start_date, '%Y-%m-%d').timestamp())
    else:
        end_timestamp = int(datetime.now().timestamp())
        
    url = f"https://min-api.cryptocompare.com/data/v2/histoday?fsym={coin_symbol}&tsym=USD&limit={limit}&toTs={end_timestamp}&api_key={os.getenv('CRYPTO_COMPARE_API_KEY')}"
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    })
    if response.status_code == 200:
        data = response.json()

        if 'Data' in data and 'Data' in data['Data']:
            prices = data['Data']['Data']
            dates = [convert_unix_to_mmdd(entry['time']) for entry in prices]
            prices = [entry['close'] for entry in prices]
            volume_from = []
            volume_to = []
            volume_dates = []
            adoption_rates = []

            for day in data['Data']['Data']:
                date = day['time']
                volume_f = day['volumefrom']
                volume_t = day['volumeto']
                volume_dates.append(convert_unix_to_mmdd(date))
                volume_from.append(volume_f)
                volume_to.append(volume_t)

            for i in range(1, len(volume_from)):
                previous_volume = volume_from[i-1]
                current_volume = volume_from[i]
                
                if previous_volume > 0:
                    growth_rate = ((current_volume - previous_volume) / previous_volume) * 100
                else:
                    growth_rate = 0  # or handle this case as needed
                
                adoption_rates.append(growth_rate)
            
            return dates, prices, volume_dates,volume_from, volume_to,adoption_rates
    return None, None, None, None,None,None


def get_market_cap(coin_symbol):
    print("Getting market cap data for", coin_symbol, "from CryptoCompare...")
    url = f"https://min-api.cryptocompare.com/data/pricemultifull?fsyms={coin_symbol}&tsyms=USD&api_key={os.getenv('CRYPTO_COMPARE_API_KEY')}"
    response = requests.get(url,headers={
               "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
               })
    data = response.json()
    if 'RAW' in data and coin_symbol in data['RAW'] and 'USD' in data['RAW'][coin_symbol]:
        return data['RAW'][coin_symbol]['USD']['MKTCAP']
    return None

def get_coin_prices(coinshandles):
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    parameters = {
        "symbol": ",".join(coinshandles),  # Comma-separated list of coin symbols
        "convert": "USD"  # Currency to convert to
    }

    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": coinmarket_key,
    }

    response = requests.get(url, headers=headers, params=parameters)

    # Parse the JSON response
    data = json.loads(response.text)

    prices = {}
    for coin in data["data"]:
        coin = data["data"][coin]
        symbol = coin["symbol"]
        price = coin["quote"]["USD"]["price"]
        prices[symbol] = price
    
    return prices



def get_tweet_sentiment(tweet_text):
    """
    Function to analyze sentiment of a tweet using TextBlob.
    Returns 'positive', 'negative', or 'neutral'.
    """
    analysis = TextBlob(tweet_text)
    
    # Assign sentiment categories
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity < 0:
        return 'negative'
    else:
        return 'neutral'

def get_user_followers_count(user_id):
    url = f"https://api.twitter.com/2/users/{user_id}?user.fields=public_metrics"
    json_response = connect_to_endpoint(url)

    if "data" in json_response:
        followers_count = json_response["data"]["public_metrics"]["followers_count"]
        tweet_count = json_response["data"]["public_metrics"]["tweet_count"]
        print(f"User has tweeted {tweet_count} times.")

        return followers_count, tweet_count

    return 0

def get_tweet_engagement(tweet):
    tweet_id = tweet['id']
    print(f"Getting engagement metrics for tweet with ID {tweet_id} ...")
   
    if tweet:
        public_metrics = tweet["public_metrics"]
        user_id = tweet["author_id"]
        likes = public_metrics.get("like_count", 0)
        retweets = public_metrics.get("retweet_count", 0)
        replies = public_metrics.get("reply_count", 0)
        shares = public_metrics.get("quote_count", 0)
        views = 0  # Twitter API v2 doesn't provide view count yet

        followers_count,tweet_count = get_user_followers_count(user_id)
        # Calculate virality score
        virality_score = likes + retweets + replies + shares + views

        # Analyze sentiment of the tweet text
        tweet_text = tweet.get("text", "")
        if tweet_text:
            sentiment = get_tweet_sentiment(tweet_text)
        else:
            sentiment = 'neutral'
        print(sentiment)
        print(f"Virality score for tweet with ID {tweet_id}: {virality_score}")
        print(f"Sentiment for tweet with ID {tweet_id}: {sentiment}")
        
        return virality_score, sentiment,likes,retweets,replies,shares,followers_count,tweet_count
    
    print(f"No engagement metrics found for tweet with ID {tweet_id}")
    return 0, 'neutral'

def get_twitter_mentions(keyword):
    print("Getting number of mentions for", keyword, "on Twitter...")
    query = f"#{keyword}"
    url = "https://api.twitter.com/2/tweets/search/recent"
    params = {
        'query': query,
        'tweet.fields': 'lang',
        'max_results': 10,
    }
    json_response = connect_to_endpoint(url, params)
    count = len(json_response.get('data', []))
    print(f"Number of mentions for {keyword}: {count}")
    return count


import re

def find_first_float(text):
    match = re.search(r'-?\d*\.?\d+', text)
    if match:
        return float(match.group(0))
    return None

limit_coins_to_check=2
def collect_coin_data(coins):
    i = 0
    global max_observed_score
    print("Collecting data for coins...")
    data = []
    if (len(coins)==0):
        print("No coins found this time")
        return []
    prices = get_coin_prices(coins)

    for coin in coins:
        print("Processing coin:", coin)
        try:
            mentions = get_twitter_mentions(coin)
            market_cap = get_market_cap(coin.upper())
            if i < limit_coins_to_check:
                if market_cap:
                    i = i+ 1
                    total_virality_score = 0
                    sentiment_counts = {'positive': 0, 'negative': 0, 'neutral': 0}
                    query = f"#{coin}"
                    url = "https://api.twitter.com/2/tweets/search/recent"
                    params = {
                        'query': query,
                        'tweet.fields': 'id,text,author_id,public_metrics',
                        'max_results': MAX_TWITTER_RESULTS,
                    }
                    json_response = connect_to_endpoint(url, params)
                    
                    response = json_response.get('data', [])
                    tweet_authors = list(set([int(tweet['author_id']) for tweet in response]))
                    
                
                    bot_levels = bomx.get_botscores_in_batch(user_ids=tweet_authors)
                    bot_scores = {sit['user_id']:sit['bot_score'] for sit in bot_levels if sit.get('bot_score') is not None}
                    
                    engagement_scores = []

                    bot_count = 0
                    total_count = 0
                    engagement_coefficient_data = []
                    length_of_response = len(response)

                    for tweet in response:
                        time.sleep(int(DELAY_BETWEEN_EACH_TWITTER_API_CALL))
                        try:
                            bot_level = bot_scores.get(tweet['author_id'])
                            if (bot_level and bot_level < bot_threshold):
                                virality_score, sentiment,likes,retweets,replies,shares,followers_count,tweet_count = get_tweet_engagement(tweet)
                                engagement_coefficient_data.append({
                                    'coin' : coin,
                                    'like_count': likes,
                                    'retweet_count': retweets,
                                    'reply_count': replies,
                                    'num_tweets': tweet_count,
                                    'followers_count': followers_count
                                })

                                total_virality_score += virality_score
                                sentiment_counts[sentiment] += 1
                                if (sentiment == 'positive'):
                                    engagement_scores.append(str(virality_score))
                                elif (sentiment == 'negative'):
                                    engagement_scores.append(str(-virality_score))
                                else:
                                    engagement_scores.append("0")
                            else:
                                print("removed bot", tweet['author_id'])
                                bot_count += 1
                        except:
                            time.sleep(300)
                        total_count += 1

                    engagement_coefficient = fetch_alphas(engagement_coefficient_data)

                    virality_score = total_virality_score / len(response) if response else 0

                    if max_observed_score < virality_score:
                        max_observed_score = virality_score

                    # Calculate sentiment proportions
                    total_tweets = sum(sentiment_counts.values())
                    sentiment_proportions = {key: count / total_tweets for key, count in sentiment_counts.items()} if total_tweets else sentiment_counts
                    print(sentiment_proportions)

                    # Determine predominant sentiment
                    predominant_sentiment = max(sentiment_proportions, key=sentiment_proportions.get)
                    print(predominant_sentiment)

                    # Convert sentiment_proportions into a sentiment string
                    sentiment_string = f"{predominant_sentiment.capitalize()} sentiment"

                    hype_to_market_cap = mentions / market_cap if market_cap > 0 else 0

                    one_month_pred = 0
                    one_year_pred = 0

                    if (prices.get(coin.upper())):
                        
                        parameters = {
                            "model": "meta-llama/Meta-Llama-3-8B-Instruct",
                            'messages': [{
                                "role": "user",
                                "content": (
                                    "Here are the engagement scores for tweets of a cryptocurrency. Positive scores mean the sentiment towards the currency is positive. "
                                    "The higher the score, the larger the chance for an increase in the price of that coin. Negative scores are the opposite; they represent the chance for prices to go down. "
                                    "The scores are:\n" + ",".join(engagement_scores) +
                                    "\nNow, if the current price of the coin is $" + str(prices[coin.upper()]) +
                                    " right now, what do you think the prices will be over the next year? Please provide 12 data points representing the predicted price at the end of each month. "
                                    "Only answer with the list of these predicted data points as plain numbers, separated by commas. Do not include any additional text.\n"
                                )
                            }]
                        }


                        headers = {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + openai_like_api_key
                        }
                        response = requests.post(openai_like_api_url, headers=headers, json=parameters)
                        data2 = json.loads(response.text)
                        llm_result = data2['choices'][0]['message']['content']
                        # Split the string by commas, remove the dollar signs, and convert each to a float
                        monthly_values = [float(value.strip().replace('$', '')) for value in llm_result.split(',')]

                        # Print the resulting list of floats
                        if (llm_result):
                            one_month_pred = monthly_values
                        else:
                            one_month_pred = [prices[coin.upper()]]

                        parameters = {
                            "model": "meta-llama/Meta-Llama-3-8B-Instruct",
                            'messages': [{
                                "role": "user",
                                "content": (
                                    "Here are the engagement scores for tweets of a cryptocurrency. Positive scores mean the sentiment towards the currency is positive. "
                                    "The higher the score, the larger the chance for an increase in the price of that coin. Negative scores are the opposite; they represent the chance for prices to go down. "
                                    "The scores are:\n" + ",".join(engagement_scores) +
                                    "\nNow, if the current price of the coin is $" + str(prices[coin.upper()]) +
                                    " right now, what do you think the prices will be over the next 5 years? Please provide 5 data points representing the predicted price at the end of each year. "
                                    "Only answer with the list of these predicted data points as plain numbers, separated by commas. Do not include any additional text.\n"
                                )
                            }]
                        }

                        headers = {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + openai_like_api_key
                        }

                        response = requests.post(openai_like_api_url, headers=headers, json=parameters)

                        data2 = json.loads(response.text)

                        llm_result = data2['choices'][0]['message']['content']
                        # Split the string by commas, remove the dollar signs, and convert each to a float
                        yearly_values = [float(value.strip().replace('$', '')) for value in llm_result.split(',')]

                        # Print the resulting list of floats
                        print(yearly_values)
                        if (llm_result):
                            one_year_pred = yearly_values
                        else:
                            one_year_pred = [prices[coin.upper()]]

                    data.append({
                        'coin': coin,
                        'mentions': mentions,
                        'market_cap': market_cap,
                        'virality_score': virality_score,
                        'sentiment_proportions': sentiment_string,
                        'hype_to_market_cap': hype_to_market_cap,
                        'one_month_pred': one_month_pred,
                        'one_year_pred': one_year_pred,
                        'bot_ratio': bot_count / total_count,
                        'engagement_coefficient' : engagement_coefficient
                    })
        except Exception as e:
            print("Problem processing:", coin)
            print(e)
    print("Data collection completed.")
    return data

def update_data():
    print("Updating data...")
    global max_observed_score
    # Fetch all coins from the database
    coins_query = Coins.query.with_entities(Coins.coin).all()

    print('coins_query',coins_query)
   
    # Extract the coin names from the query result
    new_coins = [coin[0] for coin in coins_query]    
    # new_coins = ['btc']
    # To make sure we save stuff before they end
    for specific_coin in new_coins:
        coin_data_list = collect_coin_data([specific_coin])  
        # coin_data_list = [{'coin': 'btc', 'mentions': 10, 'market_cap': 1162712168003.6943, 'virality_score': 18.8, 'sentiment_proportions': 'Neutral sentiment', 'hype_to_market_cap': 8.600580844672323e-12, 'one_month_pred': [58882.61, 59137.81, 59393.01, 59648.21, 59903.41, 60158.61, 60313.81, 60669.01, 60824.21, 61179.41, 61534.61, 61889.81], 'one_year_pred': [58745.34, 59031.81, 59318.28, 59605.75, 59893.22], 'bot_ratio': 0.7, 'engagement_coefficient': np.float64(8.892961083167894e-05)}]
        
        print('coin_data_list' , coin_data_list)    
        if (len(coin_data_list)):
            coin_data_list_handles = [i['coin'] for i in coin_data_list]
            print(coin_data_list_handles)
            if (max_observed_score == 0):
                max_observed_score = 1
            # Only delete those we have new data about
            db.session.query(CoinData).filter(CoinData.coin.in_([specific_coin])).delete()

            try:
                # Optional: Uncomment if you need to delete existing records
                db.session.query(CoinData).filter(CoinData.coin.in_([specific_coin])).delete()
                
                for coin_data in coin_data_list:
                    coin_data_obj = CoinData(
                        coin=coin_data['coin'],
                        mentions=coin_data['mentions'],
                        market_cap=coin_data['market_cap'],
                        sentiment_score=coin_data['sentiment_proportions'],
                        virality_score=coin_data['virality_score'] / max_observed_score,
                        hype_to_market_cap=coin_data['hype_to_market_cap'],
                        one_month_prediction=coin_data['one_month_pred'],
                        one_year_prediction=coin_data['one_year_pred'],
                        bot_ratio=coin_data['bot_ratio'],
                        engagement_coefficient=str(coin_data['engagement_coefficient'])
                    )
                    db.session.add(coin_data_obj)
                
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                print(f"Error during commit: {e}")
                raise



def get_coin_data(specific_coin):
    coin_data = db.session.query(CoinData).filter_by(coin=specific_coin).first()
    return coin_data


def get_tweets_data(specific_coin):
    query = f"#{specific_coin}"
    url = "https://api.twitter.com/2/tweets/search/recent"
    params = {
                'query': query,
                'tweet.fields': 'id,text,author_id,public_metrics',
                'max_results': MAX_TWITTER_RESULTS,
            }

            
    json_response = connect_to_endpoint(url, params)
    response = json_response.get('data', [])


    tweet_authors = list(set([int(tweet['author_id']) for tweet in response]))
    bot_levels = bomx.get_botscores_in_batch(user_ids=tweet_authors)
    bot_scores = {sit['user_id']:sit['bot_score'] for sit in bot_levels if sit.get('bot_score') is not None}

    tweets_info = []

    for tweet in response:
        try:
            bot_level = bot_scores.get(tweet['author_id'])
            isBot = '1' if (bot_level and bot_level < bot_threshold) else '0'
            
            public_metrics = tweet["public_metrics"]
            likes = public_metrics.get("like_count", 0)
            retweets = public_metrics.get("retweet_count", 0)
            replies = public_metrics.get("reply_count", 0)
            shares = public_metrics.get("quote_count", 0)

            tweet_text = tweet.get("text", "")
            # print(tweet_text)
            if tweet_text:
                sentiment = get_tweet_sentiment(tweet_text)
                print('469',sentiment)
            else:
                sentiment = 'neutral'

            tweet_info = {
            'tweet_id': tweet['id'],
            'isBot': isBot,
            'sentiment': sentiment,
            'likes': likes,
            'retweets': retweets,
            'replies': replies,
            'shares': shares
            }
            
            tweets_info.append(tweet_info)

        except Exception as e:
            print(f"Error processing tweet {tweet['id']}: {e}")
            time.sleep(300)

    return tweets_info


def get_new_listings():
    new_coins_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/new"
    latest_coins_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest"
   
    parameters = {
        'start': '1',  # Starting rank
        'limit': '3',  # Number of results
        'convert': 'USD'  # Currency conversion
    }
    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": coinmarket_key,
    }

    # Fetch new coins
    response_new = requests.get(new_coins_url, headers=headers, params=parameters)
    data_new = json.loads(response_new.text)
    symbols_new = [crypto['symbol'] for crypto in data_new['data']]
    
    # Fetch latest coins
    response_latest = requests.get(latest_coins_url, headers=headers, params=parameters)
    data_latest = json.loads(response_latest.text)
    symbols_latest = [crypto['symbol'] for crypto in data_latest['data']]
    
    # Merge both lists of symbols
    all_symbols = list(set(symbols_new + symbols_latest))  # Using set to avoid duplicates

    Coins.query.delete()

    # Insert new coins into the database
    for symbol in all_symbols:
        new_coin = Coins(coin=symbol)
        db.session.add(new_coin)

    # Commit the session to save changes
    db.session.commit()

    return all_symbols
  



if __name__ == "__main__":
    update_data()
