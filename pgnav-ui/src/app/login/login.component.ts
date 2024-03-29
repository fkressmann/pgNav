import { AuthGuard } from './login-auth.guard';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginPayload } from './login-payload.model';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pgnav-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData: LoginPayload = {
    db_user: '',
    db_pass: '',
    db_host: 'localhost',
    db_port: '5432',
    db_name: ''
  };

  constructor(
    private login: LoginService
  ) {}

  ngOnInit(): void {
  }

  submit(): void {
    this.login.login(this.formData);
  }

}
