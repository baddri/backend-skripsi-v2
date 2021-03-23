import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPassword extends HttpException {
  constructor() {
    super('WrongPassword', HttpStatus.BAD_REQUEST);
  }
}
