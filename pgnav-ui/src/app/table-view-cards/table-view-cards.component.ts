import { TableService } from './../core/table.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../core/person.model';

@Component({
  selector: 'pgnav-ui-table-view-cards',
  templateUrl: './table-view-cards.component.html',
  styleUrls: ['./table-view-cards.component.css']
})
export class TableViewCardsComponent implements OnInit {

  persons$: Observable<Person[]>;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.persons$ = this.tableService.mockPersonTable();
  }

}
