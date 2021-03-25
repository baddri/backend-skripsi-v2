/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CourseLesson } from './courselesson.type';

@ObjectType()
export class CourseSection {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public section_title: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public icon_url?: string;

  @Field(type => [CourseLesson], { nullable: true })
  public lessons: CourseLesson[];
}
