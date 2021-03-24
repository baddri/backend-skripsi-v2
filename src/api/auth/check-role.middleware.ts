import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  const userRole = (ctx.context as { req: { user: { roles: string[] } } }).req
    .user.roles;
  if (!(extensions.roles as string[]).some(role => userRole.includes(role))) {
    return null;
  }
  return next();
};
