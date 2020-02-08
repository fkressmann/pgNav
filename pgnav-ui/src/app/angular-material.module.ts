import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const modules = [
  MatTableModule,
  MatCardModule,
  MatSlideToggleModule
];

@NgModule({
  exports: [...modules]
})
export class AngularMaterialModule {}
