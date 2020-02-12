import psycopg2
import psycopg2.extras
from psycopg2 import sql
import re
from werkzeug.exceptions import BadRequest, InternalServerError
from models.table import Table
from models.column import Column
from models.refs import Reference
from functools import reduce

# Parse shit like 'FOREIGN KEY (allocation_id) REFERENCES allocations(id)'
parser = re.compile("FOREIGN KEY \\(([\\w_]*)\\) REFERENCES ([\\w_]*)\\(([\\w_]*)\\)")


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
        self.tables = []
        self.init_database()

    def connect(self):
        try:
            return psycopg2.connect(user=self.user,
                                    password=self.password,
                                    host=self.host,
                                    port=self.port,
                                    database=self.database)

        except Exception as error:
            print(error)
            raise InternalServerError(str(error))

    def disconnect(self):
        self.connection.close()
        print("Old connection closed successfully")

    def init_database(self):
        self.tables = self.get_all_tables()
        print(len(self.tables))
        list(map(self.describe_table, self.tables))
        list(map(self.get_ref_from, self.tables))
        list(map(self.get_ref_to, self.tables))

    def get_all_tables(self):
        query = "SELECT table_name as name, table_name::regclass::oid as oid FROM information_schema.tables WHERE table_schema = 'public';"
        self.query_executor(self.cursor, query, None)
        result = self.cursor.fetchall()
        # Create strings from one-element-tuples
        tables = [Table(name, oid) for name, oid in result]
        tables.sort(key=lambda table: table.name)
        return tables

    def describe_table(self, table):
        query = """SELECT DISTINCT a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod), i.indisprimary, a.attnum
                    FROM pg_catalog.pg_attribute a LEFT JOIN pg_index i ON a.attrelid = i.indrelid AND a.attnum =ANY(i.indkey)
                    WHERE a.attrelid = %s AND a.attnum > 0 AND NOT a.attisdropped ORDER BY a.attnum;"""
        self.query_executor(self.cursor, query, (table.oid,))
        result = self.cursor.fetchall()
        columns = [Column(name, dtype=dtype, is_primary=primary) for name, dtype, primary, attnum in result]
        table.set_columns(columns)


    def get_ref_from(self, table):
        query = "SELECT conrelid::pg_catalog.regclass, pg_catalog.pg_get_constraintdef(c.oid, true) as condef FROM " \
                "pg_catalog.pg_constraint c WHERE c.confrelid = %s AND c.contype = 'f' ORDER BY 1; "
        self.query_executor(self.cursor, query, (table.oid,))
        refs = self.cursor.fetchall()
        d_refs = []
        for ref in refs:
            regex = parser.search(ref[1])
            foreign_col = regex.group(1)
            d_refs.append(Reference(regex.group(3), ref[0], foreign_col))
        d_refs.sort(key=lambda ref: ref.table)
        for ref in d_refs:
            f = filter(lambda column: column.name == ref.source_col, table.columns)
            next(f).add_ref_from(ref)

    def get_ref_to(self, table):
        query = "SELECT pg_catalog.pg_get_constraintdef(r.oid, true) as condef FROM pg_catalog.pg_constraint r WHERE " \
                "r.conrelid = %s AND r.contype = 'f' ORDER BY 1; "
        self.query_executor(self.cursor, query, (table.oid,))
        refs = self.cursor.fetchall()
        d_refs = []
        for ref in refs:
            regex = parser.search(ref[0])
            d_refs.append(Reference(regex.group(1), regex.group(2), regex.group(3)))
        d_refs.sort(key=lambda ref: ref.table)
        for ref in d_refs:
            f = filter(lambda column: column.name == ref.source_col, table.columns)
            next(f).add_ref_to(ref)

    def select(self, table_name, limit, offset, filter_column=None, filter_value=None):
        table = next(filter(lambda table: table.name == table_name, self.tables))

        # Different queries with and without filter
        if filter_column and filter_value:
            query = sql.SQL("SELECT * FROM {} WHERE {}={} LIMIT %s OFFSET %s").format(
                sql.Identifier(table_name),
                sql.Identifier(filter_column),
                sql.Placeholder())
            self.query_executor(self.dict_cursor, query, (filter_value, limit, offset))
        else:
            if table.all_rows_loaded or len(table.rows) == 25:
                print("All Data loaded, serving table {} from cache".format(table.name))
                return table
            query = sql.SQL("SELECT * FROM {} LIMIT %s OFFSET %s").format(sql.Identifier(table_name))
            self.query_executor(self.dict_cursor, query, (limit, offset))

            if self.cursor.rowcount < limit:
                table.all_rows_loaded = True

        data = self.dict_cursor.fetchall()
        table.set_rows(data)
        return table


    # Handle cursor execution here to handle exceptions centrally
    def query_executor(self, cursor, query, params):
        try:
            if not params:
                cursor.execute(query)
            else:
                cursor.execute(query, params)
            return True
        except psycopg2.errors.InFailedSqlTransaction as e:
            self.connection.rollback()
            raise InternalServerError("Got some difficulties, rolling back...")
        except psycopg2.errors.UndefinedColumn as e:
            print(e)
            self.connection.rollback()
            raise BadRequest(e.diag.message_primary)
        except Exception as e:
            print(e)
            self.connection.rollback()
            raise InternalServerError(e)
