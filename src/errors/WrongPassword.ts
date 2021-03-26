import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPassword extends HttpException {
  constructor() {
    super('Wrong Password!', HttpStatus.BAD_REQUEST);
  }
}
