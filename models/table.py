from models.base import BaseModel


class Table(BaseModel):

    def __init__(self, oid, name, columns, rows):
        self.oid = oid
        self.name = name
        self.columns = columns
        self.rows = rows