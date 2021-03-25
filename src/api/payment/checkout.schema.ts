import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckoutDocument = Checkout & Document;

@Schema({ timestamps: true })
export class Checkout {
  @Prop({ required: true })
  public checkout_id: string;

  @Prop({ required: true })
  public object: 'checkout.session';

  @Prop()
  public allow_promotion_codes: boolean | null;

  @Prop()
  public amount_subtotal: number | null;

  @Prop()
  public amount_total: number | null;

  @Prop()
  public billing_address_collection: 'auto' | 'required' | null;

  @Prop()
  public currency: string | null;

  @Prop()
  public customer: string | null;

  @Prop()
  public customer_email: string | null;

  @Prop()
  public locale: string | null;

  @Prop()
  public mode: 'payment' | 'setup' | 'subscription';

  @Prop()
  public payment_intent: string | null;

  @Prop()
  public payment_method_types: Array<string>;

  @Prop()
  public payment_status: 'no_payment_required' | 'paid' | 'unpaid';

  @Prop()
  public submit_type: 'auto' | 'book' | 'donate' | 'pay' | null;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
