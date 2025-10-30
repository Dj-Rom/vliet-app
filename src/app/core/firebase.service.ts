import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User, onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { environment } from '../../environments/environment';
export interface SharedAddress {
  id: string;
  company: string;
  address: string;
  google_link: string;
  gps: string;
  notes?: string;


}
const app = initializeApp(environment.firebase);
const auth = getAuth(app);
export const db = getFirestore(app);

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private auth = getAuth(app);
  private db = getFirestore(app);
private user: User | null = null;


  /** Сохранение данных пользователя в Firestore */
  async saveUserData(uid: string, data: Record<string, any>) {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  }

  /** Получение данных пользователя из Firestore */
  async getUserData(uid: string) {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  }

  /** Получение всех общих адресов */

  async getSharedAddresses(): Promise<SharedAddress[]> {
    try {
      const snap = await getDocs(collection(db, 'shared_addresses'));
      return snap.docs.map(d => ({id: d.id, ...d.data()} as SharedAddress));
    } catch (error) {
      console.error('Failed to fetch shared addresses:', error);
      return [];
    }
  }


/** Добавление нового адреса с примечанием, GPS и названием фирмы */
  async addAddress(company: string, address: string, google_link: string , gps:string, notes: string) {
    const newAddressRef = doc(collection(this.db, 'shared_addresses'));
    const data = {
      company,
      address,
      google_link,
      gps,
      notes,
      createdAt: new Date().toISOString()
    };
    await setDoc(newAddressRef, data);
  }

  /** Обновление конкретного адреса */
  async updateSharedAddress(id: string, data: Record<string, any>) {
    await updateDoc(doc(db, 'shared_addresses', id), data);
  }
  /** Вход пользователя */
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.user = userCredential.user;
    return userCredential.user;
  }

  getUserEmail(){
    return this.user?.email;
  }

  /** Проверка, залогинен ли пользователь (один раз) */
  async isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
        unsubscribe(); // сразу отписываемся, чтобы не создавать утечки
      });
    });
  }

  /** Текущий пользователь */
  currentUser() {
    return this.auth.currentUser
  }

  /** Выход */
  async signOutUser(): Promise<void> {
    await signOut(this.auth);
    this.user = null;
  }

  /** Регистрация нового пользователя */
  async signUp(email: string, password: string, code?: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }
}
