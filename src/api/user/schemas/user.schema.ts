import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Role } from 'constants/Role';
import { Gender } from 'constants/Gender';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  // START OF VISIBLE PROFILE
  @Prop({ required: true })
  public full_name: string;

  @Prop()
  public avatar_url?: string;

  @Prop()
  public gender?: Gender;

  @Prop()
  public birth_date?: Date;

  @Prop()
  public information?: string;
  // END OF VISIBLE PROFILE

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

  @Prop()
  public stripe_consumer_id?: string;

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
