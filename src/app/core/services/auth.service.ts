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
  distinctUntilChanged, first,
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
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private fs = inject(Firestore);
  private tokenService = inject(TokenService);
  private httpErrorService = inject(HttpErrorService);

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
      first(),
      this.httpErrorService.handleError(),
      this.createUser(username),
      this.saveToken()
    );
  }

  login({ email, password }: LoginFormValue): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      first(),
      this.httpErrorService.handleError(),
      this.saveToken()
    );
  }

  signout() {
    return from(signOut(this.auth)).pipe(
      first(),
      tap(() => {
        this.tokenService.deleteToken();
      })
    );
  }

  private createUser(username: string): OperatorFunction<UserCredential, any> {
    return (source: Observable<UserCredential>) => source.pipe(
      switchMap((credential) => from(updateProfile(credential.user, { displayName: username })).pipe(
        map(() => credential)
      )),
      switchMap((credential) => {
        const { user } = credential;
        const data: UserData = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL
        };

        const userDoc = doc(this.fs, 'users', user.uid);
        return from(setDoc(userDoc, data)).pipe(
          map(() => credential)
        );
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
