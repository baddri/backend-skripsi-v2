/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { UserProfile } from 'api/user/types/userprofile.type';
import { ObjectId } from 'mongoose';

@ObjectType()
export class CourseChat {
  @Field(type => UserProfile)
  public owner: UserProfile;

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
