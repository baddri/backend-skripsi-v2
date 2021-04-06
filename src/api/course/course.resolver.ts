/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'decorators/CurrentUser';
import { Public } from 'decorators/Public';

import { CreateCourseArgs } from './args/createcourse.args';
import { CreateCourseSectionArgs } from './args/createcoursesection.args';
import { CreateLessonArgs } from './args/createlesson.args';
import { CourseService } from './course.service';
import { Course } from './types/course.type';
import { CourseLesson } from './types/courselesson.type';
import { CourseSection } from './types/coursesection.type';

@Resolver(of => Course)
export class CourseResolver {
  private logger = new Logger(CourseResolver.name);

  constructor(private courseService: CourseService) {}

  @Mutation(returns => Course)
  public async createCourse(
    @Args() args: CreateCourseArgs,
    @CurrentUser('id') id: string,
  ) {
    return await this.courseService.createCourse(id, args);
  }

  @Mutation(returns => CourseSection)
  public async createCourseSection(
    @Args() args: CreateCourseSectionArgs,
    @CurrentUser('id') id: string,
  ) {
    return await this.courseService.createCourseSection(args, id);
  }

  @Public()
  @Query(returns => CourseSection)
  public async getCourseSection(
    @Args('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.courseService.getCourseSection(id, userId);
  }

  @Mutation(returns => CourseLesson)
  public async createLesson(
    @Args() args: CreateLessonArgs,
    @CurrentUser('id') id: string,
  ) {
    return await this.courseService.createLesson(args, id);
  }

  @Public()
  @Query(returns => Course)
  public async getCourse(
    @Args('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.courseService.getCourse(id, userId);
  }
}
