from flask_restful import Resource, fields, marshal_with, reqparse, marshal
from werkzeug.exceptions import BadRequest
from services.database_service import DatabaseService
import datetime

connection_request_parser = reqparse.RequestParser()
connection_request_parser.add_argument('db_host')
connection_request_parser.add_argument('db_port')
connection_request_parser.add_argument('db_user')
connection_request_parser.add_argument('db_pass')
connection_request_parser.add_argument('db_name')

table_query_parser = reqparse.RequestParser()
table_query_parser.add_argument('filter_column')
table_query_parser.add_argument('by_value')
table_query_parser.add_argument('limit')
table_query_parser.add_argument('offset')

service = None
no_db = BadRequest("Need to connect to DB first, use /connect")

table_name_fields = {
    'name': fields.String
}


class DatabaseConnectController(Resource):
    def post(self):
        global service
        args = connection_request_parser.parse_args()
        service = DatabaseService(args['db_host'], args['db_port'], args['db_user'], args['db_pass'], args['db_name'])
        return {"message": "Connection created successfully :)"}, 201


class DatabaseTablesController(Resource):
    @marshal_with(table_name_fields)
    def get(self):
        if service:
            return service.tables
        else:
            raise no_db


class DatabaseTableController(Resource):
    def get(self, table):  # ToDo: refactor table to table_name, needs FE!
        if service:
            args = table_query_parser.parse_args()
            # handle limit & offset
            limit = if_set_else(args['limit'], 25)
            offset = if_set_else(args['offset'], 0)

            d = service.select(table, limit, offset, args['filter_column'], args['by_value'])
            row_fields = {}
            if len(d.rows) != 0:
                row = d.rows[0]
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
                'type': fields.String,
                'is_primary': fields.Boolean,
                'ref_from': fields.List(fields.Nested(ref_fields)),
                'ref_to': fields.List(fields.Nested(ref_fields))
            }

            db_fields = {
                'name': fields.String,
                'columns': fields.List(fields.Nested(col_fields)),
                'rows': fields.Nested(row_fields)
            }

            return marshal(d, db_fields)
        else:
            raise no_db


def if_set_else(obj, default):
    return obj if obj is not None else default

