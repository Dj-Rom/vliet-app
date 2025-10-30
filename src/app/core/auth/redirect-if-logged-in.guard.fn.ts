import {CanActivateFn, Router} from '@angular/router';
import {FirebaseService} from '../firebase.service';
import {inject} from '@angular/core';

export const redirectIfLoggedInGuard: CanActivateFn = async () => {
  const fb = inject(FirebaseService);
  const router = inject(Router);

  const loggedIn = await fb.isLoggedIn();
  if (loggedIn) {
    await router.navigate(['/main']);
    return false;
  }
  return true;
};
