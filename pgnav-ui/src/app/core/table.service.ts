import { Table } from './table.model';
import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() {}

  mockTables(): Observable<Table[]> {
    const tables: Table[] = [
      { id: 1, name: 'customers', entries: 1024 },
      { id: 2, name: 'products', entries: 15726 },
      { id: 3, name: 'clients', entries: 57 },
    ];
    return of(tables);
  }

  mockTableDefinitions() {
    return ['id', 'name', 'entries'];
  }

  mockTableData(tableName: string): Observable<any> {
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
      customers: { data: customers, defs: ['id', 'firstname', 'lastname', 'sex', 'age']},
      products: { data: products, defs: ['id', 'name', 'model', 'make'] },
      clients: { data: clients, defs: ['id', 'name'] }
    };

    return of(mappings[tableName]);
  }

}
