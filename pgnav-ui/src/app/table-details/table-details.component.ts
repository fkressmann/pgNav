import { TableDetailsAddDialogComponent } from './../table-details-add-dialog/table-details-add-dialog.component';
import { TableService } from './../core/table.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'pgnav-ui-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private route: ActivatedRoute, private tableService: TableService, private dialog: MatDialog) { }

  tableName: string;
  destroy$: Subject<boolean> = new Subject();

  data: any[];
  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe( (params: Params) => {
      this.tableName = params['table'];

      this.tableService.mockTableData(this.tableName).pipe(
        takeUntil(this.destroy$)
      ).subscribe( (response: { data: any[], defs: string[] }) => {
        this.data = response.data;
        this.columnsToDisplay = response.defs;
        this.displayedColumns = response.defs;
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
      result.id = this.data.length + 1;
      this.data.push(result);
      this.table.renderRows();
    });
  }

}
