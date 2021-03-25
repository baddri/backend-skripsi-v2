import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

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
}
