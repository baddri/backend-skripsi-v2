import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsBanned extends HttpException {
  constructor() {
    super('User is Banned!', HttpStatus.NOT_ACCEPTABLE);
  }
}
