import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';
import { getUserToken } from 'libs/jwt';

import { User, UserDocument } from './schemas/user.schema';
import { UserProfile, UserProfileDocument } from './schemas/userprofile.schema';
import { CreateUserArgs } from './args/createuser.args';
import { WrongPassword } from 'errors/WrongPassword';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(UserProfile.name)
    private UserProfileModel: Model<UserProfileDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createUser(args: CreateUserArgs): Promise<UserDocument> {
    // TODO: refactor populate. one time query is preferable
    const user_profile = await this.UserProfileModel.create({
      full_name: args.full_name,
    });
    return (
      await this.UserModel.create({
        email: args.email,
        password: await User.encriptPassword(args.password),
        user_profile: user_profile._id,
      })
    )
      .populate('user_profile')
      .execPopulate();
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.getUser(email);
    if (!(await User.comparePassword(user, password))) throw WrongPassword;
    return getUserToken(user);
  }

  public async getUser(email: string): Promise<UserDocument> {
    const user = this.UserModel.findOne({ email });
    if (!user) throw UserNotFound;
    return user;
  }

  public async getAllUsers(): Promise<UserDocument[]> {
    return this.UserModel.find().populate(['user_profile']).exec();
  }
}
