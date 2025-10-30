import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth(initializeApp(environment.firebase));
  private userSubject = new BehaviorSubject<User | null>(null);
  private user = this.userSubject.asObservable();
  private static user: Observable<User | null>;

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
  getUserEmail() {
    return this.auth.currentUser?.email;
  }

   isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
