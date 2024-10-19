import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PASSWORD_REGEXP } from '../../shared/helpers/password.regex';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }

    return PASSWORD_REGEXP.test(value) ? null : { password: true };
  };
}
