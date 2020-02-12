import { TableSearchPipe } from './table-search.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSearchComponent } from './table-search.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableSearchComponent,
    TableSearchPipe
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    TableSearchComponent,
    TableSearchPipe
  ]
})
export class TableSearchModule { }
