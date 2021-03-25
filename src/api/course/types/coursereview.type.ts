/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { User } from 'api/user/types/user.type';

@ObjectType()
export class CourseReview {
  @Field(type => ID)
  public _id: ObjectId;

  @Field(type => User)
  public owner: User;

  @Field()
  public score: number;

  @Field()
  public text: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
