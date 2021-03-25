import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CollectionDocument = Collection & Document;

@Schema({ timestamps: true })
export class Collection {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId }] })
  public completed_lesson?: ObjectId[];

  @Prop({ required: true, default: false })
  public purchased: boolean;

  @Prop({ required: true, default: false })
  public purchase_complete: boolean;

  @Prop({ type: Types.ObjectId })
  public checkout_id?: ObjectId;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
