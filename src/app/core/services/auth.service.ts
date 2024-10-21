import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  updateProfile
} from '@angular/fire/auth';
import { SignupFormValue } from '../../shared/models/types/signup-form-value.type';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { LoginFormValue } from '../../shared/models/types/login-form-value.type';
import { TokenService } from './token.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private tokenService = inject(TokenService);

  user$ = authState(this.auth);

  constructor() {
  }

  signup({ email, password, username }: SignupFormValue): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => this.saveToken(user)),
      switchMap((user) => {
        return from(updateProfile(user, { displayName: username })).pipe(
          map(() => user)
        );
      })
    );
  }

  login({ email, password }: LoginFormValue): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => this.saveToken(user))
    );
  }

  signout() {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.tokenService.deleteToken()
      })
    )
  }

  private saveToken(user: User): Observable<User> {
    return from(user.getIdToken()).pipe(
      map((token) => {
        this.tokenService.setToken(token);
        return user;
      })
    );
  }
}
