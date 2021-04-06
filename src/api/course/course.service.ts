import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { DocumentNotFound } from 'errors/DocumentNotFound';
import { Query } from 'utils/Query';
import { courseQuery } from './query/course.query';
import { CreateCourseArgs } from './args/createcourse.args';
import { CreateLessonArgs } from './args/createlesson.args';

import { Course, CourseDocument } from './schemas/course.schema';
import {
  CourseCategory,
  CourseCategoryDocument,
} from './schemas/coursecategory.schema';
import { CourseChat, CourseChatDocument } from './schemas/coursechat.schema';
import {
  CourseLesson,
  CourseLessonDocument,
} from './schemas/courselesson.schema';
import {
  CourseLessonComment,
  CourseLessonCommentDocument,
} from './schemas/courselessoncomment.schema';
import {
  CourseReview,
  CourseReviewDocument,
} from './schemas/coursereview.schema';
import {
  CourseSection,
  CourseSectionDocument,
} from './schemas/coursesection.schema';
import { CreateCourseSectionArgs } from './args/createcoursesection.args';
import { lessonQuery } from './query/lesson.query';
import { sectionQuery } from './query/section.query';

@Injectable()
export class CourseService {
  private logger = new Logger(CourseService.name);

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
    @InjectModel(CourseCategory.name)
    private CourseCategoryModel: Model<CourseCategoryDocument>,
    @InjectModel(CourseChat.name)
    private CourseChatModel: Model<CourseChatDocument>,
    @InjectModel(CourseLesson.name)
    private CourseLessonModel: Model<CourseLessonDocument>,
    @InjectModel(CourseLessonComment.name)
    private CourseLessonCommentModel: Model<CourseLessonCommentDocument>,
    @InjectModel(CourseReview.name)
    private CourseReviewModel: Model<CourseReviewDocument>,
    @InjectModel(CourseSection.name)
    private CourseSectionModel: Model<CourseSectionDocument>,
  ) {}

  public async getCourse(id: string, userId: string) {
    const res = await this.CourseModel.aggregate(
      new Query([
        {
          $match: {
            $expr: {
              $eq: [
                '$_id',
                {
                  $toObjectId: id,
                },
              ],
            },
          },
        },
      ]).chain(courseQuery(userId)).query,
    );
    if (res.length === 0) throw new DocumentNotFound();
    this.logger.log(res[0]);
    return res[0];
  }

  public async createCourse(userId: string, args: CreateCourseArgs) {
    const course = await (
      await this.CourseModel.create({
        ...args,
        owner: userId,
      })
    ).save();
    return await this.getCourse(course._id, userId);
  }

  public async getCourseSection(id: string, userId: string) {
    const res = await this.CourseSectionModel.aggregate(
      new Query([
        {
          $match: {
            $expr: {
              $eq: [
                '$_id',
                {
                  $toObjectId: id,
                },
              ],
            },
          },
        },
      ]).chain(sectionQuery(userId)).query,
    );
    if (res.length === 0) throw new DocumentNotFound();
    this.logger.log(res[0]);
    return res[0];
  }

  public async createCourseSection(
    args: CreateCourseSectionArgs,
    userId: string,
  ) {
    // TODO: check if course with given id is available
    const section = await this.CourseSectionModel.create({
      ...args,
      owner: userId,
    });
    return await this.getCourseSection(section._id, userId);
  }

  public async createLesson(args: CreateLessonArgs, userId: string) {
    // TODO: check availability of given section
    const lesson = await this.CourseLessonModel.create({
      ...args,
      owner: userId,
    });
    const res = await this.CourseLessonModel.aggregate(
      new Query([
        {
          $match: {
            _id: lesson._id,
          },
        },
      ]).chain(lessonQuery(userId)).query,
    );
    return res[0];
  }
}
