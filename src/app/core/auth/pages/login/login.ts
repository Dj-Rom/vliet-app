import { Component, NgZone } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../firebase.service';
import {User} from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loading = false;
  errorMessage = '';
  isShow = false;
user: User | undefined
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private fb: FirebaseService, private router: Router, private ngZone: NgZone) {}

  setShow() {
    this.isShow= !this.isShow;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.value;

    try {
      this.user = await this.fb.signIn(email!, password!);


      this.ngZone.run(() => {
        this.router.navigate(['/app']);
      });

    } catch (error: any) {
      console.error('❌ Login error:', error);
      this.errorMessage = error.message || 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
