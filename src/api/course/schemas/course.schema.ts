import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { CourseCategory } from './coursecategory.schema';
import { User } from 'api/user/schemas/user.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public tagline?: string;

  @Prop()
  public description?: string;

  @Prop()
  public summary?: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: CourseCategory.name }],
    default: [],
  })
  public categories: CourseCategory[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  public owner: User;

  @Prop({ default: false })
  public is_free: boolean;

  @Prop()
  public icon_url?: string;

  @Prop({ default: false })
  public published: boolean;

  @Prop()
  public published_at?: Date;

  @Prop({ required: true, unique: true })
  public slug: string;

  @Prop()
  public features?: string[];

  @Prop()
  public requirements?: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
