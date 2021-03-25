import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: true })
export class History {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public course_lesson_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;
}

export const HistorySchema = SchemaFactory.createForClass(History);
