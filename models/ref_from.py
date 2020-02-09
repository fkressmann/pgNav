class RefFrom:
    def __init__(self, table, column):
        self.table = table
        self.column = column

    def __str__(self):
        return self.table.__str__() + ':' + self.column.__str__()