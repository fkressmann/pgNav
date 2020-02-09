from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import json
from services.database_service import DatabaseService
import datetime


class Rows(fields.Raw):
    def format(self, value):
        print(value)
        if isinstance(value, datetime.datetime):
            return value.__str__()
        else:
            return {k: v.__str__() for (k, v) in value}






class DatabaseMetaController(Resource):

    #@marshal_with(db_fields)
    def get(self, database, table):
        d = DatabaseService.select(database, table, 5)

        row = d.rows[0]
        row_fields = {}
        for k, v in row.items():
            if isinstance(v, datetime.datetime):
                row_fields[k] = fields.DateTime(dt_format='iso8601')
            elif isinstance(v, str):
                row_fields[k] = fields.String
            elif isinstance(v, int):
                row_fields[k] = fields.Integer
            elif isinstance(v, datetime.date):
                row_fields[k] = fields.String
            else:
                row_fields[k] = fields.Raw

        col_fields = {
            'name': fields.String
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