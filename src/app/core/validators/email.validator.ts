import { AbstractControl, ValidatorFn } from '@angular/forms';
import { EMAIL_REGEXP } from '../../shared/helpers/email.regex';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }

    return EMAIL_REGEXP.test(value) ? null : { email: true };
  };
}
