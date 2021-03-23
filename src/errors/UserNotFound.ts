import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('User Not found!', HttpStatus.BAD_REQUEST);
  }
}
