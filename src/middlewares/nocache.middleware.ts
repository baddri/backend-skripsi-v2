import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as nocache from 'nocache';

@Injectable()
export class NocacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    return nocache()(req, res, next);
  }
}
