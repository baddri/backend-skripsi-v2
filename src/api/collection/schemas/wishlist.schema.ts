import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
