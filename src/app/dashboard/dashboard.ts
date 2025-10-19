import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Auth, AuthResponse } from '../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  public user$: Observable<AuthResponse['user'] | null>;
  public isHandset$: Observable<boolean>;

  constructor(
    private authService: Auth,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.user$ = this.authService.user$;
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
