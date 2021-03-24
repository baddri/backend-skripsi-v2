import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { UserNotFound } from 'errors/UserNotFound';

import { User, UserDocument } from './schemas/user.schema';
import { UserProfile, UserProfileDocument } from './schemas/userprofile.schema';
import { CreateUserArgs } from './args/createuser.args';

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

  public async getUser(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UserNotFound();
    return user.populate('user_profile').execPopulate();
  }

  public async getAllUsers(): Promise<UserDocument[]> {
    return this.UserModel.find().populate(['user_profile']).exec();
  }
}
