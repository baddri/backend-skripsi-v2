import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CourseSectionDocument = CourseSection & Document;

@Schema({ timestamps: true })
export class CourseSection {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ required: true })
  public section_title: string;

  @Prop()
  public description?: string;

  @Prop()
  public icon_url?: string;
}

export const CourseSectionSchema = SchemaFactory.createForClass(CourseSection);
