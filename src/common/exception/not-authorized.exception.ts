import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAuthorizedException extends HttpException {
  constructor() {
    super('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
