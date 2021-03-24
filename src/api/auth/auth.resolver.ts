/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args } from '@nestjs/graphql';

import { Public } from 'decorators/Public';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query(returns => String)
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return await this.authService.login(email, password);
  }
}
