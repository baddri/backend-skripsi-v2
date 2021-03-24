import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserProfile } from './userprofile.schema';
import { Role } from 'constants/Role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ default: false })
  public email_verified: boolean;

  @Prop()
  public phone?: string;

  @Prop()
  public phone_area?: string;

  @Prop({ default: false })
  public phone_verified: boolean;

  @Prop()
  public locale?: string;

  @Prop({ default: false })
  public is_instructor: boolean;

  @Prop()
  public instructor_since?: Date;

  @Prop({ default: false })
  public is_banned: boolean;

  @Prop({ default: false })
  public is_private: boolean;

  @Prop({ default: false })
  public is_verified: boolean;

  @Prop({ required: true })
  public password: string;

  @Prop({ default: ['USER'] })
  public roles: Role[];

  @Prop({ type: Types.ObjectId, ref: UserProfile.name })
  public user_profile: UserProfile;

  public static async comparePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    return new Promise((res, rej) => {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          rej(err);
        } else {
          res(match);
        }
      });
    });
  }

  public static async encriptPassword(password: string): Promise<string> {
    return new Promise((res, rej) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          rej(err);
        } else {
          res(hash);
        }
      });
    });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
