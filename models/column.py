from models.base import BaseModel


class Column(BaseModel):

    def __init__(self, name, table, dtype):
        self.name = name
        self.table = table
        self.dtype = dtype
        self.ref_to = []
        self.ref_from = []

    def __init__(self, pg_column):
        self.name = pg_column.name
        self.ref_to = []
        self.ref_from = []

    def add_ref_from(self, ref):
        self.ref_from.append(ref)
