import configparser


class ConnectionService:
    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read(['../connections.ini', '../connections.ini.private'])

    def get_connections(self):
        print(self.config.sections())
        return self.config.sections()

    def get_connection_details(self, connection):
        return self.config[connection]


if __name__ == '__main__':
    pass