import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';

@Component({
  selector: 'pgnav-ui-table-details-add-dialog',
  templateUrl: './table-details-add-dialog.component.html',
  styleUrls: ['./table-details-add-dialog.component.css']
})
export class TableDetailsAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TableDetailsAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) {
    }

  ngOnInit(): void {
  }

}
