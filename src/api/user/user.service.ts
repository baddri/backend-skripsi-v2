import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, UpdateQuery } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserArgs } from './args/createuser.args';
import { WrongPassword } from 'errors/WrongPassword';

import { populateUser } from 'api/common/query/populateuser';
import { Query } from 'utils/Query';
import { EmailIsUsed } from 'errors/EmailIsUsed';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createUser(args: CreateUserArgs): Promise<any> {
    try {
      const user = await (
        await this.UserModel.create({
          email: args.email,
          password: await User.encriptPassword(args.password),
          full_name: args.full_name,
        })
      ).save();
      return await this.getUserDataWithEmail(user.email);
    } catch {
      throw new EmailIsUsed();
    }
  }

  public async getUserWithEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UserNotFound();
    return user;
  }

  public async getUserDataWithEmail(email: string): Promise<any> {
    const user = await this.UserModel.aggregate(
      new Query([
        {
          $match: {
            email,
          },
        },
      ]).chain(populateUser).query,
    );
    if (!user) throw new UserNotFound();
    return user[0];
  }

  public async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.getUserWithEmail(email);
    if (!user) throw new UserNotFound();
    if (!User.comparePassword(user, oldPassword)) throw new WrongPassword();
    await this.UserModel.updateOne(
      { email },
      { password: await User.encriptPassword(newPassword) },
    );
    return true;
  }

  public async updateProfile(
    email: string,
    update: UpdateQuery<UserDocument>,
  ): Promise<UserDocument> {
    const user = await this.getUserWithEmail(email);
    if (!user) throw new UserNotFound();
    await this.UserModel.updateOne({ email }, update);
    return await this.getUserDataWithEmail(email);
  }

  public async availableEmail(email: string): Promise<boolean> {
    const res = await this.UserModel.findOne({ email });
    if (res) return false;
    return true;
  }
}
