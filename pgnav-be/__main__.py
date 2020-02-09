from flask import Flask
from flask_restful import Api
from flask_cors import CORS
# from werkzeug.middleware.profiler import ProfilerMiddleware

from controllers.database_controller import DatabaseTableController, DatabaseConnectController, DatabaseTablesController

app = Flask(__name__, static_url_path='')
CORS(app)
api = Api(app)
# app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[30])

prefix = "/api"
api.add_resource(DatabaseTableController, prefix + '/table/<string:table>')
api.add_resource(DatabaseConnectController, prefix + '/connect')
api.add_resource(DatabaseTablesController, prefix + '/tables')


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')
