import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EMAIL_REGEXP } from '../../shared/helpers/email.regex';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    return EMAIL_REGEXP.test(value) ? null : { email: true };
  };
}
