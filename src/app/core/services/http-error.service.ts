import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { catchError, Observable, OperatorFunction, throwError } from 'rxjs';
import {
  ErrorResponse,
  HttpError
} from '../../shared/models/interfaces/http-error.interface';
import { FormErrorService } from './form-error.service';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorType } from '../../shared/models/types/error-type.type';
import { HandleErrorOptions } from '../../shared/models/interfaces/handle-error-options.interface';
import { HttpErrorCode } from '../../shared/models/types/http-error-code.type';

type ErrorsMap = {
  [key in HttpErrorCode]: ErrorType;
}

interface HandleErrorByTypeOptions {
  type: ErrorType;
  options: HandleErrorOptions;
  form?: FormGroup;
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  private notificationService = inject(NotificationService);
  private formErrorService = inject(FormErrorService);
  private translateService = inject(TranslateService);

  private readonly errorsMap: ErrorsMap = {
    'auth/email-already-in-use': 'field',
    'auth/invalid-credential': 'other',
    'auth/missing-email': 'field',
    'auth/invalid-email': 'field',
    'auth/missing-password': 'field'
  };

  handleError<T>(form?: FormGroup, options: HandleErrorOptions = { setOtherErrorToForm: false }): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      catchError((error: HttpError) => {
        const type: ErrorType = this.classifyError(error);

        return this.handleErrorByType(error, { type, options, form });
      })
    );
  }

  private classifyError(error: HttpError): ErrorType {
    return this.errorsMap[error.code] || 'toast';
  }

  private handleErrorByType(error: HttpError, { type, options, form }: HandleErrorByTypeOptions): Observable<never> {
    const text = `error.${ error.code }`;
    const message = this.translateService.instant(text);

    if (type === 'toast') {
      this.notificationService.showMessage(message.includes('undefined') ? error.message : message, 'error', 7000);
    }

    if ((type === 'field' || type === 'other') && form) {
      this.formErrorService.handleFormError(form, type, error.code, options);
    }

    const response: ErrorResponse = {
      code: error.code,
      type,
      message: message.includes('undefined') ? error.message : message,
      translatedMessage: message
    };
    return throwError(() => response);
  }
}
