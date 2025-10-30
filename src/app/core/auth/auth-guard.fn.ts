import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

export const authGuard: CanActivateFn = async () => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  const isLoggedIn = await firebaseService.isLoggedIn();
  console.log('authGuard triggered, isLoggedIn =', isLoggedIn);

  if (isLoggedIn) {
    return true;
  }

  await router.navigate(['/auth/login']);
  return false;
};
