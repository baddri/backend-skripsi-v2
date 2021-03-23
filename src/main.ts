import { NestFactory } from '@nestjs/core';
import { AppModule } from 'core/app.module';

import { env } from 'env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(env.port);
}
bootstrap();
