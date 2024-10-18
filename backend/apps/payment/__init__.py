from flask import Blueprint

blueprint = Blueprint(
    'payment_blueprint',
    __name__,
    url_prefix=''
)
