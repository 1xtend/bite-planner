import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  user$ = authState(this.auth);

  constructor() {
  }
}
