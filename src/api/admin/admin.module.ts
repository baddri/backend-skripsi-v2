import { Module } from '@nestjs/common';

import { CourseModule } from 'api/course/course.module';
import { UserModule } from 'api/user/user.module';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, CourseModule],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
