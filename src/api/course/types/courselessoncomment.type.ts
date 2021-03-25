/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'api/user/types/user.type';
import { ObjectId } from 'mongoose';

@ObjectType()
export class CourseLessonComment {
  @Field(type => ID)
  public _id: ObjectId;

  @Field(type => User)
  public owner: User;

  @Field(type => TaggedComment, { nullable: true })
  public tagged_comment?: TaggedComment;

  @Field()
  public text: string;

  @Field()
  public is_me: boolean;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}

@ObjectType()
export class TaggedComment {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public text: string;
}
