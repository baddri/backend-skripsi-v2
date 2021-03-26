import { Module } from '@nestjs/common';

import { UserModule } from 'api/user/user.module';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
