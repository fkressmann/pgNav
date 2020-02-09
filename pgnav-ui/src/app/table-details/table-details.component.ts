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

  tableData: MatTableDataSource<any>;
  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    // take the tableName from the route
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe( (params: Params) => {
      this.tableName = params['table'];

      // get the actual data by passing the tableName just retrieved
      this.tableService.mockTableData(this.tableName).pipe(
        takeUntil(this.destroy$)
      ).subscribe( (response: { data: any[], defs: string[] }) => {
        this.tableData = new MatTableDataSource(response.data);
        this.columnsToDisplay = response.defs;
        this.displayedColumns = response.defs;
      });
    });

    // activate sorting
    this.tableData.sort = this.sort;
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
      result.id = this.tableData.data.length + 1;
      this.tableData.data.push(result);
      this.table.renderRows();
    });
  }

}
