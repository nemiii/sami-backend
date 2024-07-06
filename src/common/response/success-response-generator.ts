import { HttpStatus } from '@nestjs/common';

export interface SuccessResponseGeneratorArgs {
  message?: string;
  payload?: any;
  httpCode?: HttpStatus;
}

export class SuccessResponseGenerator {
  message: string;
  payload: any;
  httpCode: HttpStatus;

  constructor({ message, payload, httpCode }: SuccessResponseGeneratorArgs) {
    this.message = message;
    this.payload = payload;
    this.httpCode = httpCode;
  }
}
