import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { Overview } from './pages/overview/overview';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'overview',
        component: Overview
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
