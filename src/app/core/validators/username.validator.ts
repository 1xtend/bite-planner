import { AbstractControl, ValidatorFn } from '@angular/forms';
import { USERNAME_REGEXP } from '../../shared/helpers/username.rexeg';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }

    return USERNAME_REGEXP.test(value) ? null : { username: true };
  };
}
