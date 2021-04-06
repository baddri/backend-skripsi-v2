/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field } from '@nestjs/graphql';
import { LessonType } from '../lessontype.enum';

@ArgsType()
export class CreateLessonArgs {
  @Field()
  public title: string;

  @Field(type => LessonType)
  public type: LessonType;

  @Field({ nullable: true })
  public lesson_video_url?: string;

  @Field({ nullable: true })
  public lesson_text?: string;

  @Field({ nullable: true })
  public is_preview?: boolean;

  @Field({ nullable: true })
  public duration?: number;

  @Field()
  public course_section_id: string;
}
