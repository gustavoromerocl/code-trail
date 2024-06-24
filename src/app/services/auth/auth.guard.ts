import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const requiredRoles = route.data['roles'] as string[];

  if (isAuthenticated && currentUser) {
    const userRole = authService.getUserRole(currentUser);
    console.log("route", route)
    console.log("userRole", userRole)
    console.log("requiredRoles", requiredRoles)
    if (requiredRoles && !requiredRoles.includes(userRole as string)) {
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
