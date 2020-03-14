import webbrowser

from flask import Flask
from flask_cors import CORS
from flask_injector import FlaskInjector
from flask_restful import Api

from controllers.connections_controller import ConnectionsController
from controllers.database_controller import DatabaseTableController, DatabaseConnectController, DatabaseTablesController
from controllers.system_controller import SystemController, SystemCommandController
from dependencies import configure

# from threading import Timer
# from werkzeug.middleware.profiler import ProfilerMiddleware


app = Flask(__name__, static_url_path='')
CORS(app)
api = Api(app)
# app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[30])

prefix = "/api"
api.add_resource(DatabaseTableController, prefix + '/table/<string:table>')
api.add_resource(DatabaseConnectController, prefix + '/connect')
api.add_resource(DatabaseTablesController, prefix + '/tables')
api.add_resource(ConnectionsController, prefix + '/connections')
api.add_resource(SystemController, prefix + '/system')
api.add_resource(SystemCommandController, prefix + '/system/<string:action>')


# Enable dependency injection
FlaskInjector(app=app, modules=[configure])


def open_browser():
    webbrowser.open_new('http://127.0.0.1:5000/')


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def page_not_found(error):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    #    Timer(1, open_browser).start()
    app.run()
