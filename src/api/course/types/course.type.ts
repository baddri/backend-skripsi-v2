/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

import { CourseCategory } from './coursecategory.type';
import { Instructor } from 'api/user/types/instructor.type';
import { CourseSection } from './coursesection.type';

@ObjectType()
export class Course {
  @Field(type => ID)
  public _id: ObjectId;

  @Field()
  public title: string;

  @Field({ nullable: true })
  public tagline?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public summary?: string;

  @Field(type => [CourseCategory], { nullable: true })
  public categories?: CourseCategory[];

  @Field(type => Instructor)
  public owner: Instructor;

  @Field()
  public is_free: boolean;

  @Field({ nullable: true })
  public icon_url?: string;

  @Field()
  public published: boolean;

  @Field({ nullable: true })
  public published_at?: Date;

  @Field()
  public slug: string;

  @Field(type => [String], { nullable: true })
  public features?: string[];

  @Field(type => [String], { nullable: true })
  public requirements?: string[];

  @Field(type => [CourseSection], { nullable: true })
  public sections?: CourseSection[];

  @Field()
  public is_owned: boolean;

  @Field()
  public is_favorite: boolean;

  @Field()
  public is_reviewed: boolean;

  @Field()
  public is_wishlisted: boolean;

  @Field()
  public review_count: number;

  @Field()
  public avg_score: number;

  @Field()
  public favorite_count: number;

  @Field()
  public student_count: number;

  @Field()
  public is_completed: boolean;

  @Field()
  public section_count: number;

  @Field()
  public lesson_count: number;

  @Field()
  public progress: number;
}
