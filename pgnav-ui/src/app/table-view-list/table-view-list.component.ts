import { Table } from './../core/table.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pgnav-ui-table-view-list',
  templateUrl: './table-view-list.component.html',
  styleUrls: ['./table-view-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewListComponent implements OnInit {

  constructor() { }

  @Input() tables: Table[];
  @Input() definitions: string[];

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.columnsToDisplay = this.definitions.slice();
  }
}
