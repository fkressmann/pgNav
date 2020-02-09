from models.base import BaseModel


class Column(BaseModel):

    def __init__(self, pg_column):
        self.name = pg_column.name
        self.ref_to = []
        self.ref_from = []
        self.type = None

    def add_ref_from(self, ref):
        self.ref_from.append(ref)

    def add_ref_to(self, ref):
        self.ref_to.append(ref)

    def set_type(self, type):
        self.type = type
