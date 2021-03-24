import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { env } from 'env';
import { UserModule } from 'api/user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: env.jwtsecret,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
