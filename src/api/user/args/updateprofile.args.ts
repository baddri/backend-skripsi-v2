/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field } from '@nestjs/graphql';

import { Gender } from 'constants/Gender';

@ArgsType()
export class UpdateProfileArgs {
  @Field({ nullable: true })
  public full_name?: string;

  @Field({ nullable: true })
  public avatar_url?: string;

  @Field(type => Gender, { nullable: true })
  public gender?: Gender;

  @Field({ nullable: true })
  public birth_date?: Date;

  @Field({ nullable: true })
  public information?: string;

  @Field({ nullable: true })
  public phone?: string;

  @Field({ nullable: true })
  public phone_area?: string;

  @Field({ nullable: true })
  public locale?: string;

  @Field({ nullable: true })
  public is_private?: boolean;
}
