import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';


const modules = [
  MatTableModule,
  MatCardModule,
  MatSlideToggleModule,
  MatTooltipModule
];

@NgModule({
  exports: [...modules]
})
export class AngularMaterialModule {}
