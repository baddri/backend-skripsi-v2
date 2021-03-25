/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class CourseCategory {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public title: string;

  @Field()
  public description: string;

  @Field()
  public icon_url: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
