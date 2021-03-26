import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, UpdateQuery } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserArgs } from './args/createuser.args';
import { WrongPassword } from 'errors/WrongPassword';

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

  public async getUserWithEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UserNotFound();
    return user;
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
    return await this.UserModel.findOneAndUpdate({ email }, update, {
      new: true,
    });
  }

  public async availableEmail(email: string): Promise<boolean> {
    const res = await this.UserModel.findOne({ email });
    if (res) return false;
    return true;
  }
}
