import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { USERNAME_REGEXP } from '../../shared/helpers/username.rexeg';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value;
    if (!username) {
      return null;
    }

    if (username.length < 4) {
      return { usernameMinLength: true };
    }

    return USERNAME_REGEXP.test(username) ? null : { usernameInvalidCharacters: true };
  };
}
