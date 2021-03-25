import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseCategoryDocument = CourseCategory & Document;

@Schema({ timestamps: true })
export class CourseCategory {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public icon_url: string;
}

export const CourseCategorySchema = SchemaFactory.createForClass(
  CourseCategory,
);
