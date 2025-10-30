import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirebaseService} from '../../firebase.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-add-new-clients',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './add-new-clients.html',
  styleUrls: ['./add-new-clients.css', './../../auth/pages/login/login.css', './../../auth/auth.css']
})
export class AddNewClients {
  form: FormGroup;
user = inject(FirebaseService).currentUser()
  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {

    this.form = this.fb.group({
      company: ['', Validators.required],
      address: ['', Validators.required],
      gps: ['', [Validators.required, Validators.pattern(/^[-+]?\d{1,2}\.\d+,\s*[-+]?\d{1,3}\.\d+$/)]],
      notes: [''],
      link: ['', ]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if(this.firebaseService.currentUser()){
      const { company, address, gps, notes, link } = this.form.value;
      this.firebaseService.addAddress(company, address ,link, gps, notes).then(r => this.form.reset());

    }
  }

}
