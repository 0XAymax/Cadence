import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (authService.isLoggedIn()) {
    return true;
  }

  if (user?.role === 'ROLE_PRE_AUTH') {
    return router.createUrlTree(['/auth/mfa/type']);
  }

  router.navigate(['/sign-in']);
  return false;
};
