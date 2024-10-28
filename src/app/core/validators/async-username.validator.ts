import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of, ReplaySubject,
  switchMap, take
} from 'rxjs';
import { AuthService } from '../services/auth.service';

export function asyncUsernameValidator(authService: AuthService): AsyncValidatorFn {
  const usernameSubject = new ReplaySubject<string>();

  function isValid(username: string): Observable<ValidationErrors | null> {
    return authService.findUsername(username).pipe(
      take(1),
      catchError(() => of(null)),
      map((username) => username ? { takenUsername: true } : null)
    );
  }

  const validation$: Observable<ValidationErrors | null> = usernameSubject.pipe(
    debounceTime(350),
    distinctUntilChanged(),
    switchMap((username) => isValid(username))
  );

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    if (!username) {
      return of(null);
    }

    usernameSubject.next(username);
    return validation$.pipe(take(1));
  };
}


