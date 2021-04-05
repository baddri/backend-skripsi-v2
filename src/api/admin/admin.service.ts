/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from 'api/user/schemas/user.schema';
import { Pagination } from 'api/common/args/pagination.args';
import { CreateCategoryArgs } from './args/createcategory.args';
import {
  CourseCategory,
  CourseCategoryDocument,
} from 'api/course/schemas/coursecategory.schema';
import { DuplicateDocument } from 'errors/DuplicateDocument';

@Injectable()
export class AdminService {
  private logger = new Logger(AdminService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(CourseCategory.name)
    private CategoryModel: Model<CourseCategoryDocument>,
  ) {}

  public async getUser(id: string): Promise<UserDocument> {
    const user = await this.UserModel.findById(id);
    if (!user) throw new UserNotFound();
    return user;
  }

  public async getUserWithEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UserNotFound();
    return user;
  }

  public async getAllUsers({
    limit,
    offset,
  }: Pagination): Promise<UserDocument[]> {
    return this.UserModel.find().limit(limit).skip(offset);
  }

  public async createCourseCategory(args: CreateCategoryArgs) {
    try {
      return await this.CategoryModel.create(args);
    } catch {
      throw new DuplicateDocument();
    }
  }
}
