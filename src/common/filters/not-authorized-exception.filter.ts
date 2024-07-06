import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ExceptionTypes } from '../enums/exception.types';
  import { ApiResponseError } from '../types/api-response.interface';
  import { NotAuthorizedException } from '../exception/not-authorized.exception';
  
  @Catch(NotAuthorizedException)
  export class NotAuthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse<Response>();
  
      const status = exception.getStatus();
  
      const messages = ['Not Authroized'];
  
      const responseData: ApiResponseError = {
        error: true,
        type: ExceptionTypes.Auth,
        messages,
      };
  
      response.status(status).json(responseData);
    }
  }
  