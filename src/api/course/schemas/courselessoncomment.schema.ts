import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CourseLessonCommentDocument = CourseLessonComment & Document;

@Schema({ timestamps: true })
export class CourseLessonComment {
  @Prop({ type: Types.ObjectId, required: true })
  public course_lesson_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ type: Types.ObjectId })
  public tagged_comment_id?: ObjectId;

  @Prop()
  public text: string;
}

export const CourseLessonCommentSchema = SchemaFactory.createForClass(
  CourseLessonComment,
);
