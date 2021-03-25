import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: Types.ObjectId, required: true })
  public course_id: ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  public owner: ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
