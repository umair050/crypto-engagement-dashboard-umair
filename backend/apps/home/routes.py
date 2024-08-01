from apps.home import blueprint
from flask import render_template, request, redirect, flash, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
from .data_collector import *
from flask_jwt_extended import JWTManager as JWT, jwt_required, get_jwt_identity, create_access_token
from .models import User
from apps import db, bcrypt

@blueprint.route('/index', methods=['GET'])
@jwt_required()
def index():
    return render_template('home/data.html', segment='index')

#MAX_NUM_USERS = 5

# Can only register once. Change MAX_NUM_USERS if you want more. It is best to disable this api after you have your database set up
@blueprint.route('/register', methods=['POST'])
def register():
    #users_count = User.query.count()
    #if users_count >= MAX_NUM_USERS:
    #    return jsonify({'message': 'Registeration stopped'}), 401
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400


    new_user = User(username=username, password=bcrypt.generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registeration sucessful'}), 200

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
        return jsonify({"message": "Login sucessful.", 'access_token': access_token})
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
    print(coin_data[0].to_dict())
    
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
        dates, prices = get_historical_data(coin_symbol.capitalize(), start_date=start_date)
        return render_template('home/trading_coin.html', coin_symbol=coin_symbol, dates=dates, prices=prices, segment='trading')
 
    dates, prices = get_historical_data(coin_symbol.capitalize())

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
        discover_new_coins()
    except Exception as e:
        return jsonify({'message':'Failed to discover coins'}), 400
    return jsonify({'message':'Successful'}), 200

@blueprint.route('/home/updatecoins', methods=['GET'])
@jwt_required()
def update2():
    try:
        update_data()
    except Exception as e:
        return jsonify({'message':'Failed to update coins'}), 400
    return jsonify({'message':'Successful'}), 200