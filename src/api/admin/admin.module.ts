import { Module } from '@nestjs/common';

import { UserModule } from 'api/user/user.module';
import { AdminResolver } from './admin.resolver';

@Module({
  imports: [UserModule],
  providers: [AdminResolver],
})
export class AdminModule {}
