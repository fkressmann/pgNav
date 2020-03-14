import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { LoginPayload } from './login-payload.model';
import { ActivatedRoute, Router } from '@angular/router';

const apiRoot = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  key = 'pgNav-authenticated';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  login(payload: LoginPayload): void {
    this.http.post(`${apiRoot}/connect`, payload).subscribe( () => {
      this.isAuthenticated = true;
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      this.router.navigate([returnUrl]);
    });
  }

  logout() {
    console.log("bout to log out")
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  set isAuthenticated(value: boolean) {
    sessionStorage.setItem(this.key, String(value));
  }

  get isAuthenticated() {
    // the item is returned as string. Check the boolean value via string comparison
    const value = sessionStorage.getItem(this.key);
    return value === 'true';
  }
}
