import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  PASSWORD_NUMBER_REGEXP,
  PASSWORD_UPPERCASE_LETTER_REGEXP
} from '../../shared/helpers/password.regex';

interface PasswordErrors {
  password: {
    [K: string]: boolean
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    const errors: PasswordErrors = { password: {} };

    if (value.length < 8) {
      errors.password['minlength'] = true;
    }
    if (!PASSWORD_UPPERCASE_LETTER_REGEXP.test(value)) {
      errors.password['uppercase'] = true;
    }
    if (!PASSWORD_NUMBER_REGEXP.test(value)) {
      errors.password['number'] = true;
    }

    return Object.keys(errors.password).length > 0 ? errors : null;
  };
}
