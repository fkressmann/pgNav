import { TableSearchModule } from './table-search/table-search.module';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableViewListComponent } from './table-view-list/table-view-list.component';
import { TableViewCardsComponent } from './table-view-cards/table-view-cards.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { AppRoutingModule } from './app-routing.module';
import { TableDetailsAddDialogComponent } from './table-details-add-dialog/table-details-add-dialog.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForeignKeyRefsComponent } from './foreign-key-refs/foreign-key-refs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PropertiesArrayPipe } from './table-details/properties-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableViewListComponent,
    TableViewCardsComponent,
    TableViewComponent,
    TableDetailsComponent,
    TableDetailsAddDialogComponent,
    ForeignKeyRefsComponent,
    NavbarComponent,
    LoginComponent,
    PropertiesArrayPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule, // collects all required angular material modules
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableSearchModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
