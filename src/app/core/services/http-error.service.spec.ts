import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { HttpErrorService } from './http-error.service';
import { NotificationService } from './notification.service';
import { mockFormErrorService, mockNotificationService } from '../../testing/mock-services';
import { FormErrorService } from './form-error.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorResponse, HttpError } from '../../shared/models/interfaces/http-error.interface';
import { HttpErrorCode } from '../../shared/models/types/http-error-code.type';

describe('HttpErrorService', () => {
  let service: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: FormErrorService, useValue: mockFormErrorService }
      ]
    });
    service = TestBed.inject(HttpErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when handleError is called', () => {
    it('should show error in toast if provided error does not have specified type', fakeAsync(() => {
      const response: ErrorResponse = {
        code: undefined as unknown as HttpErrorCode,
        type: 'toast',
        message: 'Toast error',
        translatedMessage: 'error.undefined'
      };

      throwError(() => new Error('Toast error')).pipe(
        service.handleError()
      ).subscribe({
        error: (error) => {
          expect(mockNotificationService.showMessage).toHaveBeenCalledWith('Toast error', 'error', 7000);
          expect(error).toEqual(response);
        }
      });
    }));

    it('should call handleFormError when error type is "field" and form was provided', fakeAsync(() => {
      const form = new FormGroup({
        email: new FormControl('')
      });
      const response: ErrorResponse = {
        code: 'auth/email-already-in-use',
        type: 'field',
        message: 'error.auth/email-already-in-use',
        translatedMessage: 'error.auth/email-already-in-use'
      };

      throwError(() => <HttpError>{ code: 'auth/email-already-in-use' }).pipe(
        service.handleError(form)
      ).subscribe({
        error: (error) => {
          expect(mockFormErrorService.handleFormError).toHaveBeenCalledWith(form, 'field', 'auth/email-already-in-use', { setOtherErrorToForm: false });
          expect(error).toEqual(response);
        }
      });

      flush()
    }));
  });
});
