/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { Roles } from 'decorators/Roles';

import { UserService } from 'api/user/user.service';
import { User } from 'api/user/types/user.type';
import { UserDocument } from 'api/user/schemas/user.schema';
import { AdminService } from './admin.service';
import { Pagination } from 'api/common/args/pagination.args';

@Roles('ADMIN', 'DEVELOPER')
@Resolver()
export class AdminResolver {
  private logger = new Logger(AdminResolver.name);

  constructor(private adminService: AdminService) {}

  @Query(returns => User)
  public async getUserWithEmail(
    @Args('email') email: string,
  ): Promise<UserDocument> {
    return await this.adminService.getUserWithEmail(email);
  }

  @Query(returns => User)
  public async getUser(@Args('id') id: string): Promise<UserDocument> {
    return await this.adminService.getUser(id);
  }

  @Query(returns => [User])
  public async getAllUsers(
    // TODO: add keyword and sort args
    @Args() pagination: Pagination,
  ): Promise<UserDocument[]> {
    return this.adminService.getAllUsers(pagination);
  }
}
