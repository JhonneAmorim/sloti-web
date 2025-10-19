import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { Overview } from './pages/overview/overview';
import { ServicesComponent } from './pages/services/services';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  }
];
