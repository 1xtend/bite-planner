import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { SignupFormValue } from '../../shared/models/types/signup-form-value.type';
import {
  distinctUntilChanged,
  from,
  map,
  merge,
  Observable,
  of,
  OperatorFunction,
  shareReplay,
  switchMap,
  tap
} from 'rxjs';
import { LoginFormValue } from '../../shared/models/types/login-form-value.type';
import { TokenService } from './token.service';
import { User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private tokenService = inject(TokenService);

  user$: Observable<User | null> = authState(this.auth);
  authenticated$: Observable<boolean> = this.isAuthenticated().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  signup({ email, password, username }: SignupFormValue): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      this.saveToken(),
      switchMap((user) => {
        return from(updateProfile(user, { displayName: username })).pipe(
          map(() => user)
        );
      })
    );
  }

  login({ email, password }: LoginFormValue): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      this.saveToken()
    );
  }

  signout() {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.tokenService.deleteToken();
      })
    );
  }

  private saveToken(): OperatorFunction<UserCredential, User> {
    return (source: Observable<UserCredential>): Observable<User> => source.pipe(
      switchMap(({ user }) => from(user.getIdToken()).pipe(
        map((token) => {
          this.tokenService.setToken(token);
          return user;
        })))
    );
  }

  private isAuthenticated(): Observable<boolean> {
    const token = this.tokenService.getToken();
    const isTokenValid = token ? this.tokenService.isTokenExpired(token) : false;

    return merge(
      of(isTokenValid),
      this.user$.pipe(map((user) => !!user))
    );
  }
}
