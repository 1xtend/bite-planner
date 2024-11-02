import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HandleErrorOptions } from '../../shared/models/interfaces/handle-error-options.interface';
import { HttpErrorCode, HttpErrorFieldCode } from '../../shared/models/types/http-error-code.type';
import { ErrorType } from '../../shared/models/types/error-type.type';

type ControlErrorsMap = {
  [K in HttpErrorFieldCode]: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  private controlErrorsMap: ControlErrorsMap = {
    'auth/missing-email': 'email',
    'auth/email-already-in-use': 'email',
    'auth/invalid-email': 'email',
    'auth/missing-password': 'password'
  };

  handleFormError(form: FormGroup, type: ErrorType, code: HttpErrorCode, options: HandleErrorOptions): void {
    if (type === 'other') {
      if (options.setOtherErrorToForm) {
        form.setErrors({ otherError: code });
      }

      return;
    }

    if (!this.doesErrorsMapContainCode(code)) {
      throw new Error('Provided code does not exist in type HttpErrorFieldCode');
    }

    const controlName = this.controlErrorsMap[code];
    const control = form.controls[controlName];

    if (control) {
      control.setErrors({ customError: code });
    }
  }

  private doesErrorsMapContainCode(code: HttpErrorCode): code is HttpErrorFieldCode {
    return code in this.controlErrorsMap;
  }
}
