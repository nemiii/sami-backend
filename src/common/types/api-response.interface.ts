import { ExceptionTypes } from '../enums/exception.types';

export interface ApiResponseSuccess<T = any> {
  message?: string;
  payload?: T;
}

export interface ApiResponseError {
  error: boolean;
  type: ExceptionTypes;
  code?: number;
  message?: string;
  messages?: string[];
}
