import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {_Alert} from './core/alert/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, _Alert],
  template: `
    <app-alert></app-alert>
    <router-outlet></router-outlet>`,
  styleUrls: ['./app.css'],
})
export class AppComponent {
  title = signal('Van-Vliet');
  constructor() {
    console.log('✅ AppComponent bootstrapped');
  }

}
