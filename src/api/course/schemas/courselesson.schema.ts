import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types, ObjectId } from 'mongoose';

import { LessonType } from '../lessontype.enum';

export type CourseLessonDocument = CourseLesson & Document;

@Schema({ timestamps: true })
export class CourseLesson {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public type: LessonType;

  @Prop()
  public lesson_video_url?: string;

  @Prop()
  public lesson_text?: string;

  @Prop({ required: true, default: false })
  public is_preview: boolean;

  @Prop()
  public duration?: number;

  @Prop()
  public download_url?: string;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public course_section_id: ObjectId;
}

export const CourseLessonSchema = SchemaFactory.createForClass(CourseLesson);
