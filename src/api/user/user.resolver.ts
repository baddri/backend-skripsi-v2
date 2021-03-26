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
import { ChangePasswordArgs } from './args/changepassword.args';
import { UpdateProfileArgs } from './args/updateprofile.args';

@Resolver(of => User)
export class UserResolver {
  private logger = new Logger(UserResolver.name);

  constructor(private userService: UserService) {}

  @Public()
  @Mutation(returns => User)
  public async createUser(@Args() args: CreateUserArgs): Promise<UserDocument> {
    return await this.userService.createUser(args);
  }

  @Query(returns => User)
  public async myProfile(
    @CurrentUser('email') email: string,
  ): Promise<UserDocument> {
    return this.userService.getUserWithEmail(email);
  }

  @Mutation(returns => Boolean)
  public async changePassword(
    @Args() args: ChangePasswordArgs,
    @CurrentUser('email') email: string,
  ): Promise<boolean> {
    return this.userService.changePassword(
      email,
      args.oldPassword,
      args.newPassword,
    );
  }

  @Mutation(returns => User)
  public async updateProfile(
    @Args() update: UpdateProfileArgs,
    @CurrentUser('email') email: string,
  ): Promise<UserDocument> {
    return await this.userService.updateProfile(email, update);
  }
}
