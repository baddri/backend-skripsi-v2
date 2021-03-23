import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema()
export class UserProfile {
  @Prop({ required: true })
  public full_name: string;

  @Prop()
  public avatar_url?: string;

  @Prop()
  public gender?: 'MALE' | 'FEMALE';

  @Prop()
  public birth_date?: Date;

  @Prop()
  public information?: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
