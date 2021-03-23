import { sign, verify, SignOptions } from 'jsonwebtoken';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import { UserDocument } from 'api/user/schemas/user.schema';
import { UserPayload } from './UserPayload';
import { env } from 'env';

const defaultSignOptions: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

export function getUserToken(
  user: UserDocument,
  options?: SignOptions,
): string {
  const payload = new UserPayload(
    user.email,
    user.role,
    user.email_verified,
    user.is_instructor,
    user.is_banned,
  );
  return sign(classToPlain(payload), env.jwtsecret, {
    ...defaultSignOptions,
    ...options,
  });
}

export function verifyToken<T>(token: string, cls: ClassType<T>): T {
  const payload = verify(token, env.jwtsecret);
  return plainToClass(cls, payload);
}
