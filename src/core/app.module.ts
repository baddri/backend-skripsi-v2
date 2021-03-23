import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { CompressionMiddleware } from 'middlewares/compression.middleware';
import { HstsMiddleware } from 'middlewares/hsts.middleware';
import { SecurityMiddleware } from 'middlewares/security.middleware';
import { NocacheMiddleware } from 'middlewares/nocache.middleware';

import { UserModule } from 'api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from 'env';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${env.db.host}:${env.db.port}/${env.db.database}`,
      {
        user: env.db.username,
        pass: env.db.password,
      },
    ),
    GraphQLModule.forRoot({
      // TODO: hardcoded
      playground: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CompressionMiddleware,
        HstsMiddleware,
        SecurityMiddleware,
        NocacheMiddleware,
      )
      .forRoutes('*');
  }
}
