/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class User {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public full_name: string;

  @Field({ nullable: true })
  public avatar_url?: string;

  @Field({ nullable: true })
  public gender: string;

  @Field({ nullable: true })
  public birth_date: Date;

  @Field({ nullable: true })
  public information: string;

  @Field()
  public email: string;

  @Field()
  public email_verified: boolean;

  @Field({ nullable: true })
  public phone?: string;

  @Field({ nullable: true })
  public phone_area?: string;

  @Field()
  public phone_verified: boolean;

  @Field({ nullable: true })
  public locale?: string;

  @Field()
  public is_instructor: boolean;

  @Field({ nullable: true })
  public instructor_since?: Date;

  @Field()
  public is_banned: boolean;

  @Field()
  public is_private: boolean;

  @Field()
  public is_verified: boolean;

  @Field()
  public course_count: number;

  @Field()
  public owned_course_count: number;

  @Field(type => [String])
  public roles: string[];

  @Field({ nullable: true })
  public stripe_consumer_id?: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
