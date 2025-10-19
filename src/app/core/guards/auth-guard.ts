import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      console.log('Acesso negado - usuario não logado');
      router.navigate(['/auth/login']);
      return false;
    })
  );
};
