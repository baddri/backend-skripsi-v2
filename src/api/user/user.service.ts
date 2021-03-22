import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { User, UserDocument } from 'api/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createUser(user: {
    email: string;
    password: string;
  }): Promise<UserDocument> {
    const newUser = new this.UserModel({
      email: user.email,
      password: await User.encriptPassword(user.password),
    });
    return await newUser.save();
  }

  public async getUser(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email });
  }

  public async login(email: string, password: string): Promise<boolean> {
    const user = await this.getUser(email);
    return await User.comparePassword(user, password);
  }
}
