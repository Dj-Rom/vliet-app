import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FirebaseService} from '../../../firebase.service';
import {code} from '../../../../../environments/environment';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: 'registration.html',
  styleUrls: ['registration.css', '../login/login.css']
})
export class Registration {
  isShow = false;
  loading = false;
  message = '';


  private readonly CODE = code;

  form = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(4)]),
    username: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/),
    ]),
  });

  constructor(private fb: FirebaseService, private router: Router) {}

  setShow() {
    this.isShow = !this.isShow;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = '';

    const { username, password, code } = this.form.value;

    try {

      if (code !== this.CODE) {
        this.message = 'Invalid registration code.';
        this.loading = false;
        return;
      }


      const user = await this.fb.signUp(username!, password!, code!);

      if (user?.uid) {

        await this.fb.saveUserData(user.uid, {
          email: username,
          code,
          createdAt: new Date().toISOString(),
        });

        console.log('✅ Registration successful:', user.uid);
        this.message = 'Registration successful! Redirecting...';


        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      this.message = error.message || 'Registration failed. Try again.';
    } finally {
      this.loading = false;
    }
  }
}
