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

interface ErrorsMap {
  [key: string]: ErrorType;
}



interface HandleErrorByTypeOptions {
  code: string;
  form?: FormGroup;
  type: ErrorType;
  options: HandleErrorOptions;
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  private notificationService = inject(NotificationService);
  private formErrorService = inject(FormErrorService);
  private translateService = inject(TranslateService);

  private readonly errorsMap: ErrorsMap = {
    'auth/email-already-in-use': 'other',
    'auth/invalid-credential': 'other'
  };

  handleError<T>(form?: FormGroup, options: HandleErrorOptions = { setOtherErrorToForm: false }): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      catchError((error: HttpError) => {
        console.error('Error: ', error.code);

        const type: ErrorType = this.classifyError(error);

        return this.handleErrorByType({ code: error.code, form, type, options });
      })
    );
  }

  private classifyError(error: HttpError): ErrorType {
    return this.errorsMap[error.code] || 'toast';
  }

  private handleErrorByType({ code, type, form }: HandleErrorByTypeOptions): Observable<never> {
    const text = `errors.${ code }`;
    const message = this.translateService.instant(text);

    switch (type) {
      case 'field': {
        if (!form) {
          throw Error('You must provide FormGroup to handle "field" error');
        }

        this.formErrorService.handleFormError(form, message);
        break;
      }
      case 'toast':
      default: {
        this.notificationService.showMessage(message, 'error', 7000);
        break;
      }
    }

    const response: ErrorResponse = { code, type, message: text, translatedMessage: message };
    return throwError(() => response);
  }
}
