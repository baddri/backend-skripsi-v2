import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type WatchlistDocument = Watchlist & Document;

@Schema({ timestamps: true })
export class Watchlist {
  @Prop({ type: Types.ObjectId, required: true })
  public lesson_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;

  @Prop()
  public progress: number;
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
