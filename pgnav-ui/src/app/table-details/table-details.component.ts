import { Column } from './../core/column.model';
import { TableDetailsAddDialogComponent } from './../table-details-add-dialog/table-details-add-dialog.component';
import { TableService } from './../core/table.service';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ForeignKeyRefsComponent } from '../foreign-key-refs/foreign-key-refs.component';
import { TableMeta } from '../core/table-meta.model';

@Component({
  selector: 'pgnav-ui-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private dialog: MatDialog,
    private router: Router) { }

  tableName: string;
  filterColumn: string;
  filterValue: string;

  destroy$: Subject<boolean> = new Subject();

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];
  displayedColumns: string[];

  columns: any[];

  ngOnInit(): void {
    this.tableName = this.route.snapshot.params['table'];

    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      // for whatever reason the observable fires twices on route changes
      // thus check whether the route actually changed or is still the old one
      if (this.tableName !== params['table']) {
        this.tableName = params['table'];

        this.route.queryParams.pipe(
          takeUntil(this.destroy$)
        ).subscribe((params: Params) => {
          this.filterColumn = params['filter_column'];
          this.filterValue = params['by_value'];

          this.tableService.getTableData(this.tableName, this.filterColumn, this.filterValue).pipe(
            takeUntil(this.destroy$)
          ).subscribe((response: TableMeta) => {
            this.dataSource = new MatTableDataSource(response.rows);
            this.columnsToDisplay = response.columns.map(col => col.name);
            this.displayedColumns = response.columns.map(col => col.name);

            this.columns = response.columns;

            // activate sorting
            this.dataSource.sort = this.sort;
          });
        });
      } else {
        this.tableService.getTableData(this.tableName).pipe(
          takeUntil(this.destroy$)
        ).subscribe((response: TableMeta) => {
          this.dataSource = new MatTableDataSource(response.rows);
          this.columnsToDisplay = response.columns.map(col => col.name);
          this.displayedColumns = response.columns.map(col => col.name);

          this.columns = response.columns;

          // activate sorting
          this.dataSource.sort = this.sort;
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openAddEntryDialog(): void {
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

  /**
   *
   * @param column the column of the cell that was clicked
   * @param value the value of that cell
   */
  openViewRefsDialog(column: string, value: any) {
    const element = this.columns.find(col => col.name === column);
    const refsFrom = element.ref_from;
    const refsTo = element.ref_to;
    this.dialog.open(ForeignKeyRefsComponent, {
      width: '1000px',
      data: { table: this.tableName, column, value, refsFrom, refsTo }
    });
  }

  /**
   * conditionally get css class for table-cell to prevent
   * the text from appearing as a link
   * @param column
   */
  getTableCellClass(column: string) {
    if (this.hasRefs(column)) {
      return 'table-cell';
    } else {
      return '';
    }
  }

  /**
   * checks whether the column has any refs
   * @param column
   */
  hasRefs(column: string) {
    const element = this.columns.find(col => col.name === column);
    return element.ref_from.length > 0 || element.ref_to.length > 0;
  }

}
