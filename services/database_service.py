import psycopg2
import psycopg2.extras
from os import environ

from models.table import Table
from models.column import Column
cursor = False


class DatabaseService:


    @staticmethod
    def connect(database):
        global cursor
        if not cursor:
            try:
                connection = psycopg2.connect(user=environ.get("db_user"),
                                              password=environ.get("db_pass"),
                                              host="127.0.0.1",
                                              port="5432",
                                              database=database)

                cursor = connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
                # Print PostgreSQL Connection properties
                print(connection.get_dsn_parameters(), "\n")

            except (Exception, psycopg2.Error) as error:
                print("Error while connecting to PostgreSQL", error)

        return cursor

    def describe_table(table, database):
        cur = DatabaseService.connect(database)
        query = """SELECT
       COLUMN_NAME
    FROM
       information_schema.COLUMNS
    WHERE
       TABLE_NAME = %s;"""
        cur.execute(query, (table,))
        ddl = cur.fetchall()

    @staticmethod
    def select(database, table, limit=25):
        cur = DatabaseService.connect(database)
        query = """SELECT *
        FROM
           allocations
        LIMIT 5"""
        #cur.execute(query, (table, limit))
        cur.execute(query)
        ddl = cur.description
        #ddl = (Column(col) for col in ddl)
        data = cur.fetchall()
        return Table(0, table, ddl, data)

