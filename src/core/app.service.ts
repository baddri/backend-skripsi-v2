import { Injectable } from '@nestjs/common';
import * as pkg from '../../package.json';

@Injectable()
export class AppService {
  public getIndex(): any {
    return {
      name: pkg.name,
      version: pkg.version,
      graphql: '/graphql',
    };
  }
}
