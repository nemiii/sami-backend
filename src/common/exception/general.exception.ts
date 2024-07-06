import { HttpException } from '@nestjs/common';
import { ErrorMessageInterface } from '../api-errors';

export class GeneralException extends HttpException {
  constructor(error: ErrorMessageInterface, message?: string) {
    if (message) {
      error.message = message;
    }
    super(error, error.httpStatus);
  }
}
