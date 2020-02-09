from models.base import BaseModel


class Table(BaseModel):

    def __init__(self, name, oid=None, columns=None, rows=None):
        self.oid = oid
        self.name = name
        self.columns = columns
        self.rows = rows
