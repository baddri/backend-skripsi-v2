import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CourseService } from './course.service';
import { Course, CourseSchema } from './schemas/course.schema';
import { CourseChat, CourseChatSchema } from './schemas/coursechat.schema';
import {
  CourseCategory,
  CourseCategorySchema,
} from './schemas/coursecategory.schema';
import {
  CourseLesson,
  CourseLessonSchema,
} from './schemas/courselesson.schema';
import {
  CourseLessonComment,
  CourseLessonCommentSchema,
} from './schemas/courselessoncomment.schema';
import {
  CourseReview,
  CourseReviewSchema,
} from './schemas/coursereview.schema';
import {
  CourseSection,
  CourseSectionSchema,
} from './schemas/coursesection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseCategory.name, schema: CourseCategorySchema },
      { name: CourseChat.name, schema: CourseChatSchema },
      { name: CourseLesson.name, schema: CourseLessonSchema },
      { name: CourseLessonComment.name, schema: CourseLessonCommentSchema },
      { name: CourseReview.name, schema: CourseReviewSchema },
      { name: CourseSection.name, schema: CourseSectionSchema },
    ]),
  ],
  exports: [CourseService],
  providers: [CourseService],
})
export class CourseModule {}
