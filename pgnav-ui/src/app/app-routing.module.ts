import { AuthGuard } from './login/login-auth.guard';
import { LoginComponent } from './login/login.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TableViewComponent, },
  { path: 'login', component: LoginComponent },
  { path: ':table', component: TableDetailsComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

