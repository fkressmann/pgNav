import { Table } from './../core/table.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pgnav-ui-foreign-key-refs',
  templateUrl: './foreign-key-refs.component.html',
  styleUrls: ['./foreign-key-refs.component.css']
})
export class ForeignKeyRefsComponent implements OnInit {

  @Input() refsFrom: any[];
  @Input() refsTo: any[];
  @Input() currentTable: string;

  constructor() { }

  ngOnInit(): void {
  }

}
