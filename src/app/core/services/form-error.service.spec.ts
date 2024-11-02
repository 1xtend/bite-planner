import { TestBed } from '@angular/core/testing';

import { FormErrorService } from './form-error.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorCode } from '../../shared/models/types/http-error-code.type';

describe('FormErrorService', () => {
  let service: FormErrorService;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(FormErrorService);
    form = new FormGroup({
      email: new FormControl('')
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when handleFormError is called', () => {
    it('should throw error if provided code does not exist in controlErrorsMap', () => {
      expect(() =>
        service.handleFormError(form, 'field', 'wrong-code' as HttpErrorCode, { setOtherErrorToForm: false })
      ).toThrow('Provided code does not exist in type HttpErrorFieldCode');
    });

    it('should set otherError to form when type is "other"', () => {
      service.handleFormError(form, 'other', 'test-error' as HttpErrorCode, { setOtherErrorToForm: true });
      expect(form.hasError('otherError')).toBe(true);
    });

    it('should set customError to the corresponding control', () => {
      service.handleFormError(form, 'field', 'auth/email-already-in-use', { setOtherErrorToForm: false });
      expect(form.controls['email'].hasError('customError')).toBe(true);
      expect(form.controls['email'].errors?.['customError']).toBe('auth/email-already-in-use');
    });

    it('should do nothing if control does not exist in form', () => {
      service.handleFormError(form, 'field', 'auth/missing-password', { setOtherErrorToForm: false });
      expect(form.controls['password']).toBeUndefined();
    });
  });
});
