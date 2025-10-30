import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from '../navigation/navigation';
import {LoadCalculatorPage} from '../loadCalculator/load-calculator-page/load-calculator-page';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, Navigation,],
  template: `
    <div class="layout">
        <app-navigation></app-navigation>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>

  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: row;
    }

    .main-content {
      flex: 1;
      padding: 20px;
      margin-left: 200px;
    }

    @media (max-width: 600px) {
      .layout {
        flex-direction: column;
      }

      .main-content {
        margin-left: 0;
      }
    }

  `]
})
export class MainPage {

}
