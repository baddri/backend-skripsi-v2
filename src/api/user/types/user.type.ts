/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from '@nestjs/graphql';

import { UserProfile } from './userprofile.type';

@ObjectType()
export class User {
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

  @Field(type => [String])
  public roles: string[];

  // TODO: add the rest of field

  @Field(type => UserProfile)
  public user_profile: UserProfile;
}
