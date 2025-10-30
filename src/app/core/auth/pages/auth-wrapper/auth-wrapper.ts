import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {Login} from '../login/login';
import {Registration} from '../registration/registration';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.html',
  imports: [
    Login,
    Registration
  ],
  styleUrls: ['../../auth.css','./auth-wrapper.css']
})
export class AuthWrapper {
  currentUrl = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = window.location.pathname

      });
  }
}
