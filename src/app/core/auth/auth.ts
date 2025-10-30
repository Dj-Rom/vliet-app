import { Component } from '@angular/core';

import { routes} from '../../app.routes';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-auth',
  imports: [

  ],
  templateUrl: './auth.html',
  styleUrls: ['auth.css']
})
export class Auth {
  currentUrl: string;
  constructor(private location : Location) {
    this.currentUrl = this.location.path();
  }
  protected readonly routes = routes;
  protected readonly JSON = JSON;
  protected readonly Router = Router;

}
