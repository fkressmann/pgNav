import { TableService } from './../core/table.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'pgnav-ui-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private tableService: TableService) { }

  tableName: string;
  destroy$: Subject<boolean> = new Subject();

  data: any;
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

}
