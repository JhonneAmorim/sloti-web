import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { Overview } from './pages/overview/overview';


@NgModule({
  declarations: [
    Dashboard,
    Overview
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class DashboardModule { }
