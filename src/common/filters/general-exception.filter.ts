import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { GeneralException } from '../exception/general.exception';
import { ExceptionTypes } from '../enums/exception.types';
import { ApiResponseError } from '../types/api-response.interface';

@Catch(GeneralException)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: GeneralException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status = exception.getStatus();
    const { code, message } = exception.getResponse() as ApiResponseError;

    let type;

    switch (exception.constructor) {
      case GeneralException:
        type = ExceptionTypes.General;
        break;

      default:
        type = ExceptionTypes.General;
        break;
    }

    const responseData: ApiResponseError = {
      error: true,
      type,
      code,
      message,
    };

    response.status(status).json(responseData);
  }
}
