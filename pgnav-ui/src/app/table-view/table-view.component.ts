import { TableService } from './../core/table.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pgnav-ui-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  tableData$: Observable<any>;
  tableDefinitions: string[];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.tableDefinitions = this.tableService.mockTableDefinitions();
    this.tableData$ = this.tableService.mockTables();
  }

}
