import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserArgs } from './args/createuser.args';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createUser(args: CreateUserArgs): Promise<UserDocument> {
    return (
      await this.UserModel.create({
        email: args.email,
        password: await User.encriptPassword(args.password),
        full_name: args.full_name,
      })
    ).save();
  }

  public async getUser(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UserNotFound();
    return user;
  }

  public async getAllUsers(): Promise<UserDocument[]> {
    return this.UserModel.find();
  }
}
