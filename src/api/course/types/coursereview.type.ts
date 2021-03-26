/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { UserProfile } from 'api/user/types/userprofile.type';

@ObjectType()
export class CourseReview {
  @Field(type => ID)
  public _id: ObjectId;

  @Field(type => UserProfile)
  public owner: UserProfile;

  @Field()
  public score: number;

  @Field()
  public text: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
