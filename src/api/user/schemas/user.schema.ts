import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop()
  public password: string;

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
