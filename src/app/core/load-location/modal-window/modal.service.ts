import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SharedAddress} from '../../firebase.service';


@Injectable({ providedIn: 'root' })
export class ModalService {
  client$ = new BehaviorSubject<SharedAddress | null>(null);
  isOpen$ = new BehaviorSubject<boolean>(false);

  open(client: SharedAddress) {
    console.log('open modal', client);
    this.client$.next(client);
    this.isOpen$.next(true);
  }

  close() {
    this.isOpen$.next(false);
    this.client$.next(null);
  }
}
