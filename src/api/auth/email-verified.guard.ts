import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = GqlExecutionContext.create(context).getContext().req.user;
    if (user.email_verified) return true;
    return false;
  }
}
