from models.base import BaseModel


class Table(BaseModel):

    def __init__(self, name, oid):
        self.oid = oid
        self.name = name
        self.columns = []
        self.rows = []
        self.fetched = False

    def set_columns(self, columns):
        self.columns = columns

    def set_rows(self, rows):
        self.rows = rows

    def get_column_names(self):
        return list(map(lambda col: col.get_name(), self.columns))

    def __str__(self):
        return "Table: " + self.name
