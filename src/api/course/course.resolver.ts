/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'decorators/CurrentUser';

import { CreateCourseArgs } from './args/createcourse.args';
import { CourseService } from './course.service';
import { Course } from './types/course.type';

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

  @Query(returns => Course)
  public async getCourse(@Args('id') id: string) {
    return await this.courseService.getCourse(id);
  }
}
