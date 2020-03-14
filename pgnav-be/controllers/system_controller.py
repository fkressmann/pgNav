from flask import request
from flask_restful import Resource
from controllers.database_controller import service


class SystemController(Resource):
    def get(self):
        return {"message": "up :)"}, 200


class SystemCommandController(Resource):
    def post(self, action):
        print("cmd!")
        if action == 'shutdown':
            if service:
                service.disconnect()
            SystemCommandController.shutdown_server()
            return {"message": "bye"}, 200

    @staticmethod
    def shutdown_server():
        func = request.environ.get('werkzeug.server.shutdown')
        if func is None:
            raise RuntimeError('Not running with the Werkzeug Server')
        func()
