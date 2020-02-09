import { TableResponse } from './../core/table-response.model';
import { TableDetailsAddDialogComponent } from './../table-details-add-dialog/table-details-add-dialog.component';
import { TableService } from './../core/table.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'pgnav-ui-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute, private tableService: TableService, private dialog: MatDialog) { }

  tableName: string;
  destroy$: Subject<boolean> = new Subject();

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];
  displayedColumns: string[];
  refsTo: any[];
  refsFrom: any[];

  ngOnInit(): void {
    // take the tableName from the route
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe( (params: Params) => {
      this.tableName = params['table'];


      let observable;

      if (this.tableName === 'allocations') {
        observable = this.tableService.getTableData(this.tableName);
      } else {
        // get the actual data by passing the tableName just retrieved
        observable = this.tableService.mockTableData(this.tableName);
      }

      observable.pipe(
        takeUntil(this.destroy$)
      ).subscribe( (response: TableResponse) => {
        this.dataSource = new MatTableDataSource(response.rows);
        this.columnsToDisplay = response.columns.map(col => col.name);
        this.displayedColumns = response.columns.map(col => col.name);

        this.refsTo = response.refsTo;
        this.refsFrom = response.refsFrom;

        // activate sorting
        this.dataSource.sort = this.sort;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDialog(): void {
    const columns = this.columnsToDisplay.slice();
    columns.shift(); // delete the first element: id

    const dialogReference = this.dialog.open(TableDetailsAddDialogComponent, {
      width: '600px',
      data: { tableName: this.tableName, columns, table: {} }
    });

    dialogReference.afterClosed().subscribe(result => {
      // MatTableDataSource stores the actual data in the data property
      result.id = this.dataSource.data.length + 1;
      this.dataSource.data.push(result);
      this.table.renderRows();
    });
  }

  applyFilter($event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
