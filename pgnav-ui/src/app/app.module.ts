import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableViewListComponent } from './table-view-list/table-view-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TableViewListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule // collects all required angular material modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
