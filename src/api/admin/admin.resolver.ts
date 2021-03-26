/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { Roles } from 'decorators/Roles';

import { UserService } from 'api/user/user.service';
import { User } from 'api/user/types/user.type';
import { UserDocument } from 'api/user/schemas/user.schema';

@Resolver()
export class AdminResolver {
  private logger = new Logger(AdminResolver.name);

  constructor(private userService: UserService) {}

  @Roles('ADMIN', 'DEVELOPER')
  @Query(returns => User)
  public async getUserWithEmail(
    @Args('email') email: string,
  ): Promise<UserDocument> {
    return await this.userService.getUserWithEmail(email);
  }

  @Roles('ADMIN', 'DEVELOPER')
  @Query(returns => User)
  public async getUser(@Args('id') id: string): Promise<UserDocument> {
    return await this.userService.getUser(id);
  }
}
