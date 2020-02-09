from models.base import BaseModel


class Table(BaseModel):

    def __init__(self, name, oid):
        self.oid = oid
        self.name = name
        self.columns = []
        self.rows = []
        self.all_rows_loaded = False

    def set_columns(self, columns):
        self.columns = columns

    def set_rows(self, rows):
        self.rows.extend(rows)

    def __str__(self):
        return "Table: " + self.name
