from injector import singleton
from services.connection_service import ConnectionService


# configure dependency injection
def configure(binder):
    binder.bind(ConnectionService, to=ConnectionService, scope=singleton)
