/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateCourseArgs {
  @Field()
  public title: string;

  @Field({ nullable: true })
  public tagline?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public summary?: true;

  @Field(type => [String], { nullable: true })
  public categories_id: string[];

  @Field({ nullable: true })
  public is_free: boolean;

  @Field({ nullable: true })
  public icon_url: string;

  @Field(type => [String], { nullable: true })
  public features?: string[];

  @Field(type => [String], { nullable: true })
  public requirements?: string[];
}
