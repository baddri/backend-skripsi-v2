/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from 'api/user/schemas/user.schema';

@Injectable()
export class AdminService {
  private logger = new Logger(AdminService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
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

  public async getAllUsers(): Promise<UserDocument[]> {
    return this.UserModel.find();
  }
}
