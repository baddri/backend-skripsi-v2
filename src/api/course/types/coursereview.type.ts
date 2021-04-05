/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { Student } from 'api/user/types/student.type';

@ObjectType()
export class CourseReview {
  @Field(type => ID)
  public _id: ObjectId;

  @Field(type => Student)
  public owner: Student;

  @Field()
  public score: number;

  @Field()
  public text: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
