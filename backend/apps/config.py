import os, random, string

class Config(object):

    basedir = os.path.abspath(os.path.dirname(__file__))

    # Assets Management
    ASSETS_ROOT = os.getenv('ASSETS_ROOT', '/static/assets')  

    # Set up the App SECRET_KEY
    SECRET_KEY  = os.getenv('SECRET_KEY', None)
    if not SECRET_KEY:
        SECRET_KEY = ''.join(random.choice(string.ascii_lowercase) for i in range(32))     

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Use PostgreSQL instead of SQLite
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    
class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

class DebugConfig(Config):
    DEBUG = True


# Load all possible configurations
config_dict = {
    'Production': ProductionConfig,
    'Debug': DebugConfig
}
