import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import {AuthService} from '../auth/auth-service';




@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class Navigation {
  menuOpen = false;
  isLoggedIn: any;
user: string | null | undefined = null;
  constructor(private authService: AuthService, private fb: FirebaseService, private router: Router) {
    this.user = this.authService.getUserEmail();
    this.isLoggedIn = this.authService.getUserEmail();
    this.user = this.user?.slice(0, this.user?.indexOf('@'))
  }



  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  async logout(): Promise<void> {
    try {
      this.closeMenu();
      await this.fb.signOutUser();
      console.log('🚪 Logged out');
      this.isLoggedIn = false;
      await this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
