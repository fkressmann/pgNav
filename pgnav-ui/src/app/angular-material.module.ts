import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

const modules = [
  MatTableModule
];

@NgModule({
  exports: [...modules]
})
export class AngularMaterialModule {}
