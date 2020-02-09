import psycopg2
import psycopg2.extras
from psycopg2 import sql
from os import environ
import re

parser = re.compile("FOREIGN KEY \\(([\\w_]*)\\) REFERENCES ([\\w_]*)\\(([\\w_]*)\\)")

from models.table import Table
from models.column import Column
from models.ref_from import RefFrom


class DatabaseService:

    def __init__(self, database):
        self.database = database
        self.cursor = False
        self.dict_cursor = False
        self.connect()

    def connect(self):
        try:
            connection = psycopg2.connect(user=environ.get("db_user"),
                                          password=environ.get("db_pass"),
                                          host=environ.get("db_host"),
                                          port="5432",
                                          database=self.database)

            self.dict_cursor = connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
            self.cursor = connection.cursor()
            # Print PostgreSQL Connection properties
            print(connection.get_dsn_parameters(), "\n")

        except (Exception, psycopg2.Error) as error:
            print("Error while connecting to PostgreSQL", error)



    def select(self, table, limit=25):
        oid = self.get_table_oid(table)

        query = sql.SQL("SELECT * FROM {} LIMIT %s").format(sql.Identifier(table))
        self.dict_cursor.execute(query, (limit,))
        ddl = self.dict_cursor.description
        columns = [Column(c) for c in ddl]
        data = self.dict_cursor.fetchall()

        refs = self.get_ref_from(oid)
        print(refs)

        for k, v in refs.items():
            f = filter(lambda column: column.name == k, columns)
            next(f).add_ref_from(v)

        return Table(0, table, columns, data)

    def get_table_oid(self, table):
        query = "select oid from pg_catalog.pg_class where relname OPERATOR(pg_catalog.~) %s;"
        table = "^(" + table + ")$"
        self.cursor.execute(query, (table,))
        print(self.cursor.query)
        oid = self.cursor.fetchall()[0]
        return oid

    def get_ref_from(self, oid):
        query = "SELECT conrelid::pg_catalog.regclass, pg_catalog.pg_get_constraintdef(c.oid, true) as condef FROM pg_catalog.pg_constraint c WHERE c.confrelid = %s AND c.contype = 'f' ORDER BY 1;"
        self.cursor.execute(query, (oid,))
        print(self.cursor.query)
        refs = self.cursor.fetchall()
        print(refs)
        d_refs = {}
        for ref in refs:
            regex = parser.search(ref[1])
            foreign_col = regex.group(1)
            d_refs.update({regex.group(3): RefFrom(ref[0], foreign_col)})
        return d_refs



