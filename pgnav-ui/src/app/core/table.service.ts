import { TableResponse } from './table-response.model';
import { Table } from './table.model';
import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiRoot: string = 'http://localhost:5000/api';
const testDB: string = 'plf_main_test';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {}

  getTableData(tableName: string): Observable<TableResponse> {
    return this.http.get<TableResponse>(`${apiRoot}/table/${tableName}`);
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${apiRoot}/tables`);
  }

  mockTables(): Observable<Table[]> {
    const tables: Table[] = [
      { name: 'producers' },
      { name: 'sites' },
      { name: 'rooms' },
      { name: 'allocations' }
    ];
    return of(tables);
  }

  mockTableData(tableName: string): Observable<TableResponse> {
    const producers: TableResponse = {
      rows: [
        { id: 1, firstname: 'Hans', lastname: 'Wurst', sex: 'male', age: 18 },
        { id: 2, firstname: 'Clara', lastname: 'Kant', sex: 'female', age: 25 },
        { id: 3, firstname: 'Kent', lastname: 'Clark', sex: 'male', age: 37 },
      ],
      columns: [
        { name: 'id'}, { name: 'firstname'}, { name: 'lastname'}, { name: 'sex' }, { name: 'age' }
      ],
      name: 'customers',
      refsTo: [
        { table: 'rooms', column: 'id' },
        { table: 'sites', column: 'client_id' },
      ],
      refsFrom: [
        { table: 'producers', column: 'id' },
        { table: 'allocations', column: 'prod_id' }
      ]
    };

    const sites: TableResponse = {
      rows: [
        { id: 1, name: 'Dicer', model: '2000', make: 'Nicer' },
        { id: 2, name: 'VW Polo', model: 'Polo', make: 'VW' },
        { id: 3, name: 'Dude', model: 'Houston', make: 'Texas' },
      ],
      columns: [
        { name: 'id' }, { name: 'name' }, { name: 'model' }, { name: 'make'}
      ],
      name: 'products',
      refsTo: [],
      refsFrom: []
    };

    const rooms: TableResponse = {
      rows: [
        { id: 1, name: 'Allocato GmbH' },
        { id: 2, name: 'Syraro AG' },
        { id: 3, name: 'Schnibbel mbH' },
      ],
      columns: [
        { name: 'id' }, { name: 'name' }
      ],
      name: 'clients',
      refsTo: [
        { table: 'allocations', column: 'prod_id' }
      ],
      refsFrom: []
    };

    const allocations: TableResponse = {
      rows: [
        { id: 1, name: 'Hausbuettel 3' },
        { id: 2, name: 'Haus Nikoluas 4' },
        { id: 3, name: 'Holzhüttle' },
      ],
      columns: [
        { name: 'id' }, { name: 'name' }
      ],
      name: 'clients',
      refsTo: [
        { table: 'rooms', column: 'prod_id' }
      ],
      refsFrom: []
    };

    const mappings = {
      producers,
      sites,
      rooms,
      allocations
    };

    return of(mappings[tableName]);
  }

}
