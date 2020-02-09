from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import json
from services.database_service import DatabaseService
import datetime

class DatabaseConnectController(Resource):
    pass

class DatabaseMetaController(Resource):

    #@marshal_with(db_fields)
    def get(self, database, table):
        service = DatabaseService(database)
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



        #return json.dumps(d, default=DatabaseMetaController.converter)
        return marshal(d, db_fields)

    @staticmethod
    def converter(o):
        if isinstance(o, datetime.datetime):
            return o.__str__()