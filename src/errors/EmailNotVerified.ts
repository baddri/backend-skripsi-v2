import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotVerified extends HttpException {
  constructor() {
    super('Email is not verified!', HttpStatus.NOT_ACCEPTABLE);
  }
}
