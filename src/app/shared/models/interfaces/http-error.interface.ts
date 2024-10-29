import { ErrorType } from '../types/error-type.type';
import { HttpErrorCode } from '../types/http-error-code.type';

export interface HttpError {
  code: HttpErrorCode;
}

export interface ErrorResponse extends HttpError {
  type: ErrorType;
  message: string;
  translatedMessage: string;
}
