/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class Student {
  @Field(type => ID)
  public _id: ObjectId;

  @Field({ nullable: true })
  public full_name: string;

  @Field({ nullable: true })
  public avatar_url: string;

  @Field()
  public is_verified: boolean;
}
