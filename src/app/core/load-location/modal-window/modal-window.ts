import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {FirebaseService, SharedAddress} from '../../firebase.service';
import {ModalService} from './modal.service';
import {AuthService} from '../../auth/auth-service';
import {FormsModule} from '@angular/forms';
import {AlertService} from '../../alert/alert.service';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.css']
})
export class ModalWindow {
  client: SharedAddress | null = null;
  isOpen = false;
  isEdit = false;

  constructor(private modalService: ModalService, private authService: AuthService, private fb: FirebaseService, private  alertService:AlertService) {
    this.modalService.client$.subscribe((client: SharedAddress | null) => this.client = client);
    this.modalService.isOpen$.subscribe((isOpen: boolean) => this.isOpen = isOpen);
  }
isAuth(){
    return this.authService.getUserEmail();
}
edit(){
    this.isEdit = !this.isEdit;
}
  close() {
    this.modalService.close();
    this.isEdit = false;
  }

  save() {
    if(this.isAuth()){
      if(this.client){
    this.fb.updateSharedAddress(this.client?.id!, this.client).then(
      () => {
        this.alertService.show('success', 'Client saved successfully!');
        this.modalService.close();
        this.isEdit = false;
      },
      (error) => {
        console.error('Failed to update address:', error);
      }
    )
      }
    }
  }
}
