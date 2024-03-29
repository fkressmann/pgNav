import { Table } from './../core/table.model';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pgnav-ui-table-view-cards',
  templateUrl: './table-view-cards.component.html',
  styleUrls: ['./table-view-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewCardsComponent implements OnInit {

  @Input() tables: Table[];

  constructor() { }

  ngOnInit(): void {
  }

}
