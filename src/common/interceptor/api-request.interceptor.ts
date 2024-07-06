import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
  import { Reflector } from '@nestjs/core';
  import { Observable } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
  import { ApiResponseSuccess } from '../types/api-response.interface';
  import { SuccessResponseGenerator } from '../response/success-response-generator';
  import { isString } from '../utils/is-string';
  
  @Injectable()
  export class ApiRequestInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((value) => {
          const apiResponse: ApiResponseSuccess = {};
          const response = context.switchToHttp().getResponse<Response>();
          const request = context.switchToHttp().getRequest<Request>();
  
          const message = this.reflector.get<string>(
            'message',
            context.getHandler(),
          );
  
          // Prometheus requires string output
          if (request.url === '/metrics') {
            return value;
          }
  
          if (isString(value)) {
            apiResponse.message = value;
          } else if (value instanceof SuccessResponseGenerator) {
            apiResponse.message = value.message || message;
            apiResponse.payload = value.payload;
            if (value.httpCode) {
              response.status(value.httpCode);
            }
          } else {
            if (message) {
              apiResponse.message = message;
            }
            apiResponse.payload = value;
          }
  
          // Returning the API response
          return apiResponse;
        }),
        catchError((err) => {
          // Throwing back the error which will get returned back to the client side
        //   const response = context.switchToHttp().getResponse<Response>();
          // Note: Adding raw error to res for debugging/logging purpose
        //   response.err = err;
  
          throw err;
        }),
      );
    }
  }
  