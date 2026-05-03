import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const mfaGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const currentUser = authService.currentUser() || null;

    if (!currentUser) {
        router.navigate(['/sign-in']);
        return false;
    }

    if (currentUser.role === 'PRE_AUTH') {
        return true;
    }

    return router.createUrlTree(['/user/dashboard']);
}