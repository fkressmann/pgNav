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
    return this.http.get<TableResponse>(`${apiRoot}/db/${testDB}/table/${tableName}`);
  }

  mockTables(): Observable<Table[]> {
    const tables: Table[] = [
      { id: 1, name: 'customers', entries: 1024 },
      { id: 2, name: 'products', entries: 15726 },
      { id: 3, name: 'clients', entries: 57 },
      { id: 4, name: 'incidents', entries: 1301 },
      { id: 5, name: 'feedback', entries: 107 },
      { id: 6, name: 'contacts', entries: 213 },
      { id: 7, name: 'allocations', entries: 5 },
    ];
    return of(tables);
  }

  mockTableDefinitions() {
    return ['id', 'name', 'entries'];
  }

  mockTableData(tableName: string): Observable<TableResponse> {
    const customers: Person[] = [
      { id: 1, firstname: 'Hans', lastname: 'Wurst', sex: 'male', age: 18 },
      { id: 2, firstname: 'Clara', lastname: 'Kant', sex: 'female', age: 25 },
      { id: 3, firstname: 'Kent', lastname: 'Clark', sex: 'male', age: 37 },
    ];

    const products: any[] = [
      { id: 1, name: 'Dicer', model: '2000', make: 'Nicer' },
      { id: 2, name: 'VW Polo', model: 'Polo', make: 'VW' },
      { id: 3, name: 'Dude', model: 'Houston', make: 'Texas' },
    ];

    const clients: any[] = [
      { id: 1, name: 'Allocato GmbH' },
      { id: 2, name: 'Syraro AG' },
      { id: 3, name: 'Schnibbel mbH' },
    ];

    const mappings = {
      customers: {
        rows: customers,
        columns: [
          { name: 'id'}, { name: 'firstname'}, { name: 'lastname'}, { name: 'sex' }, { name: 'age' }
        ],
        name: 'customers'
      },
      products: {
        rows: products,
        columns: [
          { name: 'id' }, { name: 'name' }, { name: 'model' }, { name: 'make'}
        ],
        name: 'products'
      },
      clients: {
        rows: clients,
        columns: [
          { name: 'id' }, { name: 'name' }
        ],
        name: 'clients'
      }
    };

    return of(mappings[tableName]);
  }

}
