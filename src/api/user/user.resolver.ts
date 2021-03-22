/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './types/user.type';
import { UserService } from './user.service';
import { UserDocument } from 'api/user/schemas/user.schema';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User)
  public async getUser(@Args('email') email: string): Promise<UserDocument> {
    return await this.userService.getUser(email);
  }

  @Query(returns => Boolean)
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    return await this.userService.login(email, password);
  }

  @Mutation(returns => User)
  public async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserDocument> {
    return await this.userService.createUser({ email, password });
  }
}
