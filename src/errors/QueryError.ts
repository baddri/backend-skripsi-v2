import { HttpException, HttpStatus } from '@nestjs/common';

export class QueryError extends HttpException {
  constructor() {
    super('Query error!. contact developer', HttpStatus.NOT_ACCEPTABLE);
  }
}
