/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class Instructor {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public full_name: string;

  @Field({ nullable: true })
  public avatar_url: string;

  @Field({ nullable: true })
  public information: string;

  @Field()
  public instructor_since: Date;

  @Field()
  public is_verified: boolean;

  @Field()
  public course_count: number;

  @Field()
  public student_count: number;
}
