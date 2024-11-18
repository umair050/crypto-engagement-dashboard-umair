from apps.home import blueprint
from flask import render_template, request, redirect, flash, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
from .data_collector import *
from flask_jwt_extended import JWTManager as JWT, jwt_required, get_jwt_identity, create_access_token
from .models import User
from apps import db, bcrypt
from .analytics import fetch_alphas
import stripe
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import os

load_dotenv()


# Set your Stripe API key
stripe.api_key = os.getenv('STRIPE_API_KEY')




@blueprint.route('/index', methods=['GET'])
@jwt_required()
def index():
    return render_template('home/data.html', segment='index')

#MAX_NUM_USERS = 5

# Can only register once. Change MAX_NUM_USERS if you want more. It is best to disable this api after you have your database set up
@blueprint.route('/register', methods=['POST'])
def register(): 

       # Extract the username and password from the request
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Validate input
    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create the new user in the database
    new_user = User(username=username, password=hashed_password)

    try:
        # Create a Stripe customer when the user signs up
        stripe_customer = stripe.Customer.create(
            # email=email,  # Assuming email is an email, if not, you can add a separate email field
            name=username,  # Assuming email is an email, if not, you can add a separate email field
            description=f"Customer for {email}"
        )

        print("Customer", stripe_customer)
        # Store the Stripe customer ID in the user model
        new_user.stripe_customer_id = stripe_customer['id']  # Ensure your User model has a stripe_customer_id field

        # Add the new user to the database and commit
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Registration successful'}), 200

    except Exception as e:
        # If an error occurs, rollback the session and return an error
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@blueprint.route('/login', methods=['POST'])
def login():
    users_count = User.query.count()
    print(users_count)
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):  # Assuming you are storing hashed passwords
        return jsonify({"message": "Invalid credentials"}), 401
    
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({
                "message": "Login successful.",
                'access_token': access_token,
                'user': user.serialize()  # Serialize the user object
            })
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@blueprint.route('/home/data', methods=['GET', 'POST'])
@jwt_required()
def data():
    if request.method == 'POST':
        #try:
        keyword = request.form.get('keyword').split(",")
        coins = discover_new_coins(keyword)
      
        # except Exception as e:
        #     print(e)
        #     flash(f'Failed: {e}.', 'error')

        coins = Coins.query.with_entities(Coins.coin).all()
        
        return render_template('home/data.html', coins=coins, segment='data')
    
    coins = Coins.query.with_entities(Coins.coin).all()
    return jsonify({'coins':[i[0] for i in coins]})
   


@blueprint.route('/home/analysis', methods=['GET'])
@jwt_required()
def analysis():
    
    
    coin_data = CoinData.query.all()
    # print(coin_data[0].to_dict())
    
    return jsonify({'coin_data':[i.to_dict() for i in coin_data]})


# @blueprint.route('/home/trading', methods=['GET'])
# def trading():


#     #coin_data = update_data()
#     # Query all values of the 'coin' field from CoinData table
#     coin_list = CoinData.query.all()
#     #coin_list=["BTC","ETH","XRP","LTC"]
#     # Extracting the values from SQLAlchemy results into a plain list
#     #coin_names = [coin for coin in coin_list]

#     return jsonify(coin_list)


@blueprint.route('/home/trading/<coin_symbol>', methods=['GET', 'POST'])
@jwt_required()
def trading_coin(coin_symbol):

    if request.method == 'POST':
        start_date = request.form.get('start_date')
        dates, prices, *_ = get_historical_data(coin_symbol.capitalize(), start_date=start_date)
        return render_template('home/trading_coin.html', coin_symbol=coin_symbol, dates=dates, prices=prices, segment='trading')
 
    dates, prices, *_ = get_historical_data(coin_symbol.capitalize())

    return jsonify({'coin_symbol':coin_symbol, 'dates':dates, 'prices':prices})



@blueprint.route('/home/trading/remove/<int:coin_id>', methods=['GET'])
@jwt_required()
def trading_coin_remove(coin_id):
    coin_data = CoinData.query.get(coin_id)

    if coin_data:
        db.session.delete(coin_data)
        db.session.commit()
        return(jsonify({'message': 'Removal successful'}))
    else:
        return jsonify({'message':'Coin not found.'}), 404


@blueprint.route('/home/discovercoins', methods=['GET'])
@jwt_required()
def update1():
    try:
        # discover coins from twitter
        discover_new_coins()
    except Exception as e:
        return jsonify({'message':'Failed to discover coins'}), 400
    return jsonify({'message':'Successful'}), 200


@blueprint.route('/home/newcoins', methods=['GET'])
# @jwt_required()
def update3():
    try:
        # get new coin from coin market api 
        data = get_new_listings()
        return jsonify(data)
    except Exception as e:
        return jsonify({'message':'Failed to update coins'}), 400
    return jsonify({'message':'Successful'}), 200

@blueprint.route('/home/updatecoins', methods=['GET'])
# @jwt_required()
def update2():
    try:
        update_data()
    except Exception as e:
        return jsonify({'message':'Failed to update coins'}), 400
    return jsonify({'message':'Successful'}), 200

@blueprint.route('/coin-details/<coin_symbol>', methods=['GET', 'POST'])
@jwt_required()
def get_coin_details(coin_symbol):

    coin_data = get_coin_data(coin_symbol)
    dates, prices, volume_dates,volume_from, volume_to,adoption_rates = get_historical_data(coin_symbol.capitalize())
    tweets_data = get_tweets_data(coin_symbol)
    
    # print('coin_data',coin_data,'dates',dates,'prices',prices,'tweets_data',tweets_data)
    if not tweets_data:
        tweets_data = []
    if coin_data and dates and prices:
        return jsonify({
                'coin': coin_data.coin,
                'mentions': coin_data.mentions,
                'market_cap': coin_data.market_cap,
                'sentiment_score': coin_data.sentiment_score,
                'virality_score': coin_data.virality_score,
                'hype_to_market_cap': coin_data.hype_to_market_cap,
                'one_month_prediction': coin_data.one_month_prediction,
                'one_year_prediction': coin_data.one_year_prediction,
                'bot_ratio': coin_data.bot_ratio,
                'created_at' : coin_data.created_at,
                'dates' : dates,
                'prices' : prices,
                'volume_dates' : volume_dates,
                'volume_from' : volume_from,
                'volume_to': volume_to,
                'tweets_data' : tweets_data,
                'adoption_rates' : adoption_rates
        }), 200
    else:
        return jsonify({'error': 'No data found for the specified coin.'}), 404
        
   
@blueprint.route('/me', methods=['GET'])
@jwt_required()  # Protect this route, allowing only authenticated users
def get_auth_user():
    # Get the user ID from the token
    user_id = get_jwt_identity()
    
    # Query the user by their ID
    user = User.query.get(user_id)
    subscription_data = None

    if user:
        # Check if the user has a Stripe customer ID and subscription ID
        if user.stripe_customer_id and user.stripe_subscription_id:
            try:
                # Fetch the subscription details from Stripe
                subscriptions = stripe.Subscription.list(customer=user.stripe_customer_id, limit=1, status='active')
                if subscriptions.data:
                    latest_subscription = subscriptions.data[0]  # Get the latest subscription

                    # Get the product ID from the subscription's line items
                    subscription_item = latest_subscription['items']['data'][0]  # Assuming there is at least one item
                    price_id = subscription_item['price']['id']
                    product_id = subscription_item['price']['product']

                    # Fetch the product details using the product ID
                    product = stripe.Product.retrieve(product_id)

                    # Extract relevant subscription data
                    subscription_data = {
                        "id": latest_subscription.id,
                        "status": latest_subscription.status,
                        "plan": {
                            "price_id": price_id,
                            "product_name": product.name,  # Get the product name
                        },
                        "current_period_start": latest_subscription.current_period_start,
                        "current_period_end": latest_subscription.current_period_end,
                    }
            except Exception as e:
                print(f"Error fetching subscription details: {str(e)}")
    
    # If the user exists, return their details
    if user:
        return jsonify({
            "message": "User details fetched successfully.",
            "user": user.serialize() ,
            "subscription": subscription_data 
        })
    else:
        return jsonify({"message": "User not found."}), 404




 


# Load environment variables
SMTP_SERVER = os.getenv('SMTP_SERVER')  # SMTP server address
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))  # Default to port 587 if not set
SMTP_USERNAME = os.getenv('SMTP_USERNAME')  # SMTP username
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')  # SMTP password
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')  # Email address of the admin

 
@blueprint.route('/send-email', methods=['POST'])
def send_email():
    """
    Endpoint to handle sending emails via SMTP.
    """
    try:
        # Parse JSON input
        data = request.json
        if not data:
            return jsonify({"message": "Request body must be JSON."}), 400

        # Extract fields
        name = data.get('name')
        email = data.get('email')
        description = data.get('description')

        # Validate required fields
        missing_fields = [field for field in ['name', 'email', 'description'] if not data.get(field)]
        if missing_fields:
            return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Ensure environment variables are configured
        if not all([SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, ADMIN_EMAIL]):
            return jsonify({"message": "SMTP configuration is incomplete. Please check environment variables."}), 500

        # Prepare the email
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = ADMIN_EMAIL
        msg['Subject'] = f"New Message from {name}"

        body = f"Name: {name}\nEmail: {email}\nMessage: {description}"
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)

        return jsonify({"message": "Email sent successfully."}), 200

    except smtplib.SMTPAuthenticationError:
        return jsonify({"message": "SMTP authentication failed. Check your email credentials."}), 500

    except smtplib.SMTPException as smtp_err:
        return jsonify({"message": f"SMTP error occurred: {smtp_err}"}), 500

    except Exception as e:
        return jsonify({"message": f"An unexpected error occurred: {str(e)}"}), 500
    # Uncomment to enforce JWT authentication
    # user_id = get_jwt_identity()

    try:
        # Parse JSON input
        data = request.json
        if not data:
            return jsonify({"message": "Request body must be JSON."}), 400

        name = data.get('name')
        email = data.get('email')
        description = data.get('description')

        # Validate required fields
        missing_fields = [field for field in ['name', 'email', 'description'] if not data.get(field)]
        if missing_fields:
            return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Prepare the email
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = ADMIN_EMAIL
        msg['Subject'] = f"New Message from {name}"

        body = f"Name: {name}\nEmail: {email}\nMessage: {description}"
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server and send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)

        return jsonify({"message": "Email sent successfully."}), 200

    except smtplib.SMTPAuthenticationError:
        return jsonify({"message": "SMTP authentication failed. Check your email credentials."}), 500

    except smtplib.SMTPException as smtp_err:
        return jsonify({"message": f"SMTP error occurred: {smtp_err}"}), 500

    except Exception as e:
        return jsonify({"message": f"An unexpected error occurred: {str(e)}"}), 500