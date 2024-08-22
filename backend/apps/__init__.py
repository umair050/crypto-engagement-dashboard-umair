import os
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from importlib import import_module
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager as JWT

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()

def register_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)

def register_blueprints(app):
    for module_name in ('authentication', 'home'):
        module = import_module('apps.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)

def configure_database(app):
    try:
        with app.app_context():
            db.create_all()
    except Exception as e:
        print('> Error: DBMS Exception: ' + str(e))

        # If the connection to PostgreSQL fails, an exception will be raised.
        # Instead of falling back to SQLite, you should focus on fixing the connection.
        # Commented out the SQLite fallback to enforce using the external database.

        # print('> Fallback to SQLite ')
        # basedir = os.path.abspath(os.path.dirname(__file__))
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')
        # db.create_all()

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.config['DEBUG'] = False
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    jwt = JWT(app)
    return app
