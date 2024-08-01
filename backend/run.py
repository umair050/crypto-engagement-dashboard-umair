import os
from   flask_migrate import Migrate
#from   flask_minify  import Minify
from   sys import exit

from apps.config import config_dict
from apps import create_app, db

from flask_apscheduler import APScheduler
from apps.home.data_collector import *

import datetime

# WARNING: Don't run with debug turned on in production!
DEBUG = False#(os.getenv('DEBUG', 'False') == 'True')

# The configuration
get_config_mode = 'Production'#'Debug' if DEBUG else 'Production'

try:

    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production] ')

app = create_app(app_config)
Migrate(app, db)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

#@scheduler.task('interval', id='do_job_1', seconds=30, misfire_grace_time=900)
def job1():
    with scheduler.app.app_context():
        discover_new_coins()

scheduler.add_job(id='job1', func=job1, trigger='interval', seconds=7200)#, next_run_time=datetime.datetime.now()+datetime.timedelta(seconds=10))


def job2():
    with scheduler.app.app_context():
        #try:
        update_data()
            #flash(f'Successfully analyzed data.', 'success')
        #except Exception as e:
        #    print(e)

scheduler.add_job(id='job2', func=job2, trigger='interval', seconds=10200)#, next_run_time=datetime.datetime.now()+datetime.timedelta(seconds=30))

# if not DEBUG:
#     Minify(app=app, html=True, js=False, cssless=False)
    
if DEBUG:
    app.logger.info('DEBUG            = ' + str(DEBUG)             )
    app.logger.info('Page Compression = ' + 'FALSE' if DEBUG else 'TRUE' )
    app.logger.info('DBMS             = ' + app_config.SQLALCHEMY_DATABASE_URI)
    app.logger.info('ASSETS_ROOT      = ' + app_config.ASSETS_ROOT )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
