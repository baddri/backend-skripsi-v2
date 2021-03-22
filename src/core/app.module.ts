import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

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
export class AppModule {}
