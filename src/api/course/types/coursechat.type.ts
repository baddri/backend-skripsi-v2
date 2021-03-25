/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from 'api/user/types/user.type';
import { ObjectId } from 'mongoose';

@ObjectType()
export class CourseChat {
  @Field(type => User)
  public owner: User;

  @Field(type => TaggedChat, { nullable: true })
  public tagged_chat?: TaggedChat;

  @Field()
  public text: string;

  @Field()
  public show: boolean;

  @Field()
  public is_me: boolean;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}

@ObjectType()
export class TaggedChat {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public text: string;
}
