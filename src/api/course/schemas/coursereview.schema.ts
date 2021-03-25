import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CourseReviewDocument = CourseReview & Document;

@Schema({ timestamps: true })
export class CourseReview {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ required: true })
  public score: number;

  @Prop()
  public text?: string;
}

export const CourseReviewSchema = SchemaFactory.createForClass(CourseReview);
