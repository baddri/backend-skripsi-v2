import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsUsed extends HttpException {
  constructor() {
    super('Email provided is used!', HttpStatus.NOT_ACCEPTABLE);
  }
}
