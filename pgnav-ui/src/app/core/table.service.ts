import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() {}

  mockPersonTable(): Observable<Person[]> {
    const persons: Person[] = [
      { id: 1, firstname: 'Hans', lastname: 'Wurst', sex: 'male', age: 18 },
      { id: 2, firstname: 'Clara', lastname: 'Kant', sex: 'female', age: 25 },
      { id: 3, firstname: 'Kent', lastname: 'Clark', sex: 'male', age: 37 },
    ];

    return of(persons);
  }

  personsColumns(): string[] {
    return ['id', 'firstname', 'lastname', 'sex', 'age'];
  }

}
