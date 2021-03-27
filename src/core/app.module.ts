import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

import { CompressionMiddleware } from 'middlewares/compression.middleware';
import { HstsMiddleware } from 'middlewares/hsts.middleware';
import { SecurityMiddleware } from 'middlewares/security.middleware';
import { NocacheMiddleware } from 'middlewares/nocache.middleware';

import { UserModule } from 'api/user/user.module';
import { CourseModule } from 'api/course/course.module';
import { AuthModule } from 'api/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from 'env';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { CollectionModule } from 'api/collection/collection.module';
import { NotificationModule } from 'api/notification/notification.module';
import { PaymentModule } from 'api/payment/payment.module';
import { AdminModule } from 'api/admin/admin.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    CollectionModule,
    NotificationModule,
    PaymentModule,
    AdminModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${env.db.host}:${env.db.port}/${env.db.database}`,
      {
        user: env.db.username,
        pass: env.db.password,
        useFindAndModify: false,
        connectionFactory: (connection: Connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-slug-generator'));
          return connection;
        },
      },
    ),
    GraphQLModule.forRoot({
      // TODO: hardcoded
      playground: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
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
