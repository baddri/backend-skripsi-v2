import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateDocument extends HttpException {
  constructor() {
    super(
      'Document with given field already exist!',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
