from models.base import BaseModel


class Column(BaseModel):

    def __init__(self, name, dtype=None, is_primary=False):
        self.name = name
        self.ref_to = []
        self.ref_from = []
        self.type = dtype
        self.is_primary = True if is_primary else False  # Dont allow None here

    def add_ref_from(self, ref):
        self.ref_from.append(ref)

    def add_ref_to(self, ref):
        self.ref_to.append(ref)

    def set_type(self, type):
        self.type = type

    def set_primary(self):
        self.is_primary = True

    def __str__(self):
        return "Column: " + self.name
