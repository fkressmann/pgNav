from flask_restful import Resource
from injector import inject

from services.connection_service import ConnectionService


class ConnectionsController(Resource):
    @inject
    def __init__(self, con: ConnectionService):
        self.connection_service = con

    def get(self):
        return self.connection_service.get_connections()
