import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guarda de autenticación para proteger rutas basadas en la autenticación del usuario y sus roles.
 * 
 * @param route - Información de la ruta actual.
 * @param state - El estado de la ruta.
 * @returns `true` si el usuario está autenticado y tiene los roles necesarios, de lo contrario `false`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const requiredRoles = route.data['roles'] as string[];

  if (isAuthenticated && currentUser) {
    const userRole = authService.getUserRole(currentUser);
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
