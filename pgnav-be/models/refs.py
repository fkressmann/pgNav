class Reference:
    def __init__(self, source_col, table,  column):
        self.source_col = source_col
        self.table = table
        self.column = column

    def __str__(self):
        return self.table.__str__() + ':' + self.column.__str__()