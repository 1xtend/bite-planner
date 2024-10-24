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
  switchMap, take,
  tap
} from 'rxjs';
import { LoginFormValue } from '../../shared/models/types/login-form-value.type';
import { TokenService } from './token.service';
import { User, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { UserData } from '../../shared/models/interfaces/user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private fs = inject(Firestore);
  private tokenService = inject(TokenService);

  user$: Observable<User | null> = authState(this.auth);
  authenticated$: Observable<boolean> = this.isAuthenticated().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  signup({ email, password, username }: SignupFormValue) {
    if (!username) {
      throw new Error('You must provide username to signup!');
    }

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      take(1),
      this.saveToken(),
      switchMap((user) => from(updateProfile(user, { displayName: username })).pipe(
        take(1),
        map(() => user)
      )),
      this.setUser()
    );
  }

  login({ email, password }: LoginFormValue): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      take(1),
      this.saveToken()
    );
  }

  signout() {
    return from(signOut(this.auth)).pipe(
      take(1),
      tap(() => {
        this.tokenService.deleteToken();
      })
    );
  }

  private setUser(): OperatorFunction<User, any> {
    return (source: Observable<User>) => source.pipe(
      switchMap((user) => {
        const data: UserData = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL,
          metadata: user.metadata
        };
        console.log(data);

        const userDoc = doc(this.fs, 'users', user.uid);
        return from(setDoc(userDoc, data));
      })
    );
  }

  private saveToken(): OperatorFunction<UserCredential, User> {
    return (source: Observable<UserCredential>): Observable<User> => source.pipe(
      switchMap(({ user }) => from(user.getIdToken()).pipe(
        take(1),
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
