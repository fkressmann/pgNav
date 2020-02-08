import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pgnav-ui-table-view-list',
  templateUrl: './table-view-list.component.html',
  styleUrls: ['./table-view-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewListComponent implements OnInit {

  constructor() { }

  @Input() data: any[];
  @Input() definitions: string[];

  columnsToDisplay: string[];
  displayedColumns: string[];

  ngOnInit(): void {
    this.columnsToDisplay = this.definitions.slice();
    this.displayedColumns = this.definitions.slice();
  }

}
