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

    def __init__(self, host, port, user, password, database):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.database = database
        self.connection = self.connect()
        self.cursor = self.connection.cursor()
        self.dict_cursor = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def connect(self):
        try:
            return psycopg2.connect(user=self.user,
                                    password=self.password,
                                    host=self.host,
                                    port=self.port,
                                    database=self.database)

        except (Exception, psycopg2.Error) as error:
            print("Error while connecting to PostgreSQL", error)

    def get_all_tables(self):
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
        self.cursor.execute(query)
        result = self.cursor.fetchall()
        tables = [Table(name[0]) for name in result]
        return tables

    def select(self, table, limit=25):
        oid = self.get_table_oid(table)

        query = sql.SQL("SELECT * FROM {} LIMIT %s").format(sql.Identifier(table))
        self.dict_cursor.execute(query, (limit,))
        ddl = self.dict_cursor.description
        columns = [Column(c) for c in ddl]
        data = self.dict_cursor.fetchall()

        refs = self.get_ref_from(oid)
        print(refs)

        for ref in refs:
            f = filter(lambda column: column.name == ref.source_col, columns)
            next(f).add_ref_from(ref)

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
        d_refs = []
        for ref in refs:
            regex = parser.search(ref[1])
            foreign_col = regex.group(1)
            d_refs.append(RefFrom(regex.group(3), ref[0], foreign_col))
        return d_refs
