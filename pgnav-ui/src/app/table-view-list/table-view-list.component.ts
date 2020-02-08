import { TableService } from './../core/table.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../core/person.model';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'pgnav-ui-table-view-list',
  templateUrl: './table-view-list.component.html',
  styleUrls: ['./table-view-list.component.css']
})
export class TableViewListComponent implements OnInit, OnDestroy {

  constructor(private tableService: TableService) { }

  destroy$: Subject<boolean> = new Subject();

  data: Person[];
  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.columnsToDisplay = this.tableService.personsColumns();
    this.displayedColumns = this.columnsToDisplay.slice(); // create a copy
    this.tableService.mockPersonTable().pipe(
      takeUntil(this.destroy$),
    ).subscribe( (persons: Person[]) => this.data = persons);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
