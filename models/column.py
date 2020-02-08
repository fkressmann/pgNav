from models.base import BaseModel


class Column(BaseModel):

    def __init__(self, name, table, dtype, ref_to, ref_from):
        self.name = name
        self.table = table
        self.dtype = dtype
        self.ref_to = ref_to
        self.ref_from = ref_from

    def __init__(self, pg_column):
        self.name = pg_column.name
