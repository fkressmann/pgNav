import { Table } from './table.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableMeta } from './table-meta.model';

const apiRoot: string = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {}

  getTableData(tableName: string, filterColumn?: string, filterValue?: string): Observable<TableMeta> {
    if (filterColumn && filterValue) {
      return this.http.get<TableMeta>(`${apiRoot}/table/${tableName}?filter_column=${filterColumn}&by_value=${filterValue}`);
    } else {
      return this.http.get<TableMeta>(`${apiRoot}/table/${tableName}`);
    }
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${apiRoot}/tables`);
  }
}
