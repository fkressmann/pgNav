import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


const modules = [
  MatTableModule,
  MatCardModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatButtonModule
];

@NgModule({
  exports: [...modules]
})
export class AngularMaterialModule {}
