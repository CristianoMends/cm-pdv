import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined';

  const token = isBrowser 
    ? localStorage.getItem('authToken') || sessionStorage.getItem('authToken') 
    : null;

  if (!token) {
    router.navigate(['/']).then(() => false);
    return false;
  }
  return true;
};
