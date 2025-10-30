import { Routes } from '@angular/router';
import { AuthWrapper } from './core/auth/pages/auth-wrapper/auth-wrapper';
import { MainPage } from './core/main-page/main';
import { authGuard } from './core/auth/auth-guard.fn'; // ✅ импорт функции

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    component: AuthWrapper,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/pages/login/login').then(m => m.Login),
        data: { title: 'Login' }
      },
      {
        path: 'registration',
        loadComponent: () =>
          import('./core/auth/pages/registration/registration').then(m => m.Registration),
        data: { title: 'Register' }
      }
    ]
  },

  {
    path: 'app',
    component: MainPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'load-management',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/loadCalculator/load-calculator-page/load-calculator-page').then(m => m.LoadCalculatorPage),
        data: { title: 'Load Calculator' }
      },
      {
        path: 'time-counter',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/time-counter/time-counter').then(m => m.TimeCounter),
        data: { title: 'Time Counter' }
      },
      {
        path: 'add-new-address',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/clients/add-new-clients/add-new-clients').then(m => m.AddNewClients),
        data: { title: 'Add New Address' }
      },
      {
        path: 'load-location',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/load-location/load-location').then(m => m.LoadLocation),
        data: { title: 'Load Location' }
      }
    ]
  },

  {
    path: 'login',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
