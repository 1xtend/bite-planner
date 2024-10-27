import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HandleErrorOptions } from '../../shared/models/interfaces/handle-error-options.interface';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() {
  }

  handleFormError(form: FormGroup, text: string, options: HandleErrorOptions) {

  }
}
