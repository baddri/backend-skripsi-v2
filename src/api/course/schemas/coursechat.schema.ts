import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CourseChatDocument = CourseChat & Document;

@Schema({ timestamps: true })
export class CourseChat {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ type: Types.ObjectId })
  public tagged_chat_id?: ObjectId;

  @Prop({ required: true })
  public text: string;

  @Prop({ required: true, default: true })
  public show: boolean;
}

export const CourseChatSchema = SchemaFactory.createForClass(CourseChat);
