import { TableService } from './../core/table.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../core/table.model';

@Component({
  selector: 'pgnav-ui-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  tables$: Observable<Table[]>;
  tableDefinitions: string[];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.tableDefinitions = ['name'];
    this.tables$ = this.tableService.getTables();
    // this.tables$ = this.tableService.getMockTables();
  }
}
