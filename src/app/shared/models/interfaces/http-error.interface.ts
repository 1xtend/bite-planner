import { ErrorType } from '../types/error-type.type';

export interface HttpError {
  code: string;
}

export interface ErrorResponse extends HttpError {
  type: ErrorType;
  message: string;
  translatedMessage: string;
}
