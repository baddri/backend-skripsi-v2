/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { Checkout as CheckoutEntity } from './checkout.schema';

@ObjectType()
export class Checkout implements CheckoutEntity {
  @Field(type => ID)
  public _id: ObjectId;

  @Field(type => String)
  public object: 'checkout.session';

  @Field()
  public checkout_id: string;

  @Field({ nullable: true })
  public allow_promotion_codes: boolean;

  @Field({ nullable: true })
  public amount_subtotal: number;

  @Field({ nullable: true })
  public amount_total: number;

  @Field(type => String, { nullable: true })
  public billing_address_collection: 'auto' | 'required';

  @Field({ nullable: true })
  public currency: string;

  @Field({ nullable: true })
  public customer: string;

  @Field({ nullable: true })
  public customer_email: string;

  @Field({ nullable: true })
  public locale: string;

  @Field(type => String)
  public mode: 'payment' | 'setup' | 'subscription';

  @Field({ nullable: true })
  public payment_intent: string;

  @Field(type => [String], { nullable: true })
  public payment_method_types: string[];

  @Field(type => String)
  public payment_status: 'no_payment_required' | 'paid' | 'unpaid';

  @Field(type => String, { nullable: true })
  public submit_type: 'auto' | 'book' | 'donate' | 'pay';
}
