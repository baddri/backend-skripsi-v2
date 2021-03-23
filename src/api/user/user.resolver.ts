/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './types/user.type';
import { UserService } from './user.service';
import { UserDocument } from 'api/user/schemas/user.schema';
import { CreateUserArgs } from './args/createuser.args';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User)
  public async getUser(@Args('email') email: string): Promise<UserDocument> {
    return await this.userService.getUser(email);
  }

  @Query(returns => String)
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return await this.userService.login(email, password);
  }

  @Mutation(returns => User)
  public async createUser(@Args() args: CreateUserArgs): Promise<UserDocument> {
    return await this.userService.createUser(args);
  }

  @Mutation(returns => Boolean)
  public async example(@Args() args: CreateUserArgs): Promise<boolean> {
    return true;
  }
}
