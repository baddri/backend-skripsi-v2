/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { User } from './types/user.type';
import { UserService } from './user.service';
import { UserDocument } from 'api/user/schemas/user.schema';
import { CreateUserArgs } from './args/createuser.args';
import { Public } from 'decorators/Public';
import { CurrentUser } from 'decorators/CurrentUser';
import { Roles } from 'decorators/Roles';
import { EmailVerified } from 'decorators/EmailVerified';

@Resolver(of => User)
export class UserResolver {
  private logger = new Logger(UserResolver.name);

  constructor(private userService: UserService) {}

  @Query(returns => User)
  public async getUser(@Args('email') email: string): Promise<UserDocument> {
    return await this.userService.getUser(email);
  }

  @Public()
  @Mutation(returns => User)
  public async createUser(@Args() args: CreateUserArgs): Promise<UserDocument> {
    return await this.userService.createUser(args);
  }

  @Query(returns => User)
  public async myProfile(
    @CurrentUser('email') email: string,
  ): Promise<UserDocument> {
    return this.userService.getUser(email);
  }
}
