import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentNotFound extends HttpException {
  constructor() {
    super('Document with given id not found!', HttpStatus.NOT_ACCEPTABLE);
  }
}
