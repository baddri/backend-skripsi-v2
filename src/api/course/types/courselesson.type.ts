/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { User } from 'api/user/schemas/user.schema';

@ObjectType()
export class CourseLesson {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public title: string;

  @Field(type => String)
  public type: 'VIDEO' | 'TEXT';

  @Field({ nullable: true })
  public lesson_video_url?: string;

  @Field({ nullable: true })
  public lesson_text?: string;

  @Field()
  public is_preview: boolean;

  @Field({ nullable: true })
  public duration?: number;

  @Field({ nullable: true })
  public download_url?: string;

  @Field()
  public is_viewed: boolean;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
