import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TableMeta } from '../core/table-meta.model';

@Component({
  selector: 'pgnav-ui-table-view-list',
  templateUrl: './table-view-list.component.html',
  styleUrls: ['./table-view-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewListComponent implements OnInit {

  constructor() { }

  @Input() data: TableMeta[];
  @Input() definitions: string[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.columnsToDisplay = this.definitions.slice();
    this.displayedColumns = this.definitions.slice();

    this.dataSource.sort = this.sort;
  }

  applyFilter($event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
