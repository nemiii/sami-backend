import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ExceptionTypes } from '../enums/exception.types';
  import { NestValidationError } from '../types/nest-validation-error.interface';
  import { ApiResponseError } from '../types/api-response.interface';
  
  @Catch(BadRequestException)
  export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse<Response>();
  
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as NestValidationError;
  
      const messages = exceptionResponse.message;
  
      const responseData: ApiResponseError = {
        error: true,
        type: ExceptionTypes.Validation,
        messages,
      };
  
      response.status(status).json(responseData);
    }
  }
  