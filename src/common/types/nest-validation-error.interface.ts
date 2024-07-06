import { HttpStatus } from '@nestjs/common';

export interface NestValidationError {
  statusCode: HttpStatus;
  message: string[];
  error: string;
}
