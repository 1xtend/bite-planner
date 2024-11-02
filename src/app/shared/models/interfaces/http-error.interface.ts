import { ErrorType } from '../types/error-type.type';
import { HttpErrorCode } from '../types/http-error-code.type';

export interface HttpError {
  code: HttpErrorCode;
  message: string;
}

export interface ErrorResponse extends HttpError {
  type: ErrorType;
  translatedMessage: string;
}
