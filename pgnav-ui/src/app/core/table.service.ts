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

  getTableData(tableName: string): Observable<TableMeta> {
    return this.http.get<TableMeta>(`${apiRoot}/table/${tableName}`);
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${apiRoot}/tables`);
  }
}
