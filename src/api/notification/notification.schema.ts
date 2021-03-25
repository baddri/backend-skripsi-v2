import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  public category: string;

  @Prop({ type: Types.ObjectId, required: true })
  public created_by: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public created_to: ObjectId;

  @Prop({ required: true, default: false })
  public is_viewed: boolean;

  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public message: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
