import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';

@Component({
  selector: 'pgnav-ui-foreign-key-refs',
  templateUrl: './foreign-key-refs.component.html',
  styleUrls: ['./foreign-key-refs.component.css']
})
export class ForeignKeyRefsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForeignKeyRefsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
