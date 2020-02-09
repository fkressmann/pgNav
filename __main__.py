from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from controllers.database_controller import DatabaseMetaController, DatabaseConnectController, DatabaseTablesController


app = Flask(__name__, static_url_path='')
CORS(app)
api = Api(app)

prefix = "/api"
api.add_resource(DatabaseMetaController, prefix + '/table/<string:table>')
api.add_resource(DatabaseConnectController, prefix + '/connect')
api.add_resource(DatabaseTablesController, prefix + '/tables')


@app.route('/')
def hello_world():
    return 'Flask running'
#    return app.send_static_file('index.html')


#app.run(debug=True, host='0.0.0.0')