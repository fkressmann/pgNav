from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import json
from services.database_service import DatabaseService
import datetime

connection_request_parser = reqparse.RequestParser()
connection_request_parser.add_argument('db_host')
connection_request_parser.add_argument('db_port')
connection_request_parser.add_argument('db_user')
connection_request_parser.add_argument('db_pass')
connection_request_parser.add_argument('db_name')

service = None

table_name_fields = {
    'name': fields.String
}


class DatabaseConnectController(Resource):
    def post(self):
        global service
        args = connection_request_parser.parse_args()
        service = DatabaseService(args['db_host'], args['db_port'], args['db_user'], args['db_pass'], args['db_name'])
        return 'Created :)'


class DatabaseTablesController(Resource):
    @marshal_with(table_name_fields)
    def get(self):
        return service.get_all_tables()


class DatabaseMetaController(Resource):
    def get(self, table):
        d = service.select(table, 5)

        row = d.rows[0]
        row_fields = {}
        for k, v in row.items():
            if isinstance(v, datetime.datetime):
                row_fields[k] = fields.DateTime(dt_format='iso8601')
            elif isinstance(v, str):
                row_fields[k] = fields.String
            elif isinstance(v, int):
                row_fields[k] = fields.Integer
            elif isinstance(v, float):
                row_fields[k] = fields.Float
            elif isinstance(v, bool):
                row_fields[k] = fields.Boolean
            elif isinstance(v, datetime.date):
                row_fields[k] = fields.String
            else:
                row_fields[k] = fields.Raw

        ref_fields = {
            'table': fields.String,
            'column': fields.String
        }

        col_fields = {
            'name': fields.String,
            'ref_from': fields.List(fields.Nested(ref_fields))
        }

        db_fields = {
            'name': fields.String,
            'columns': fields.List(fields.Nested(col_fields)),
            'rows': fields.Nested(row_fields)
        }

        return marshal(d, db_fields)

    @staticmethod
    def converter(o):
        if isinstance(o, datetime.datetime):
            return o.__str__()