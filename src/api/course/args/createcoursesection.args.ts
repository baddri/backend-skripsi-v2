import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateCourseSectionArgs {
  @Field()
  public course_id: string;

  @Field()
  public section_title: string;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public icon_url: string;
}
