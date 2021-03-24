import { applyDecorators } from '@nestjs/common';
import { FieldOptions } from '@nestjs/graphql/dist/decorators';
import { Field, Extensions, ReturnTypeFunc } from '@nestjs/graphql';

import { Role } from 'constants/Role';
import { checkRoleMiddleware } from 'api/auth/check-role.middleware';

export function RoleField(roles: Role[]);
export function RoleField(roles: Role[], options?: FieldOptions);
export function RoleField(
  roles: Role[],
  options?: FieldOptions,
  returntypefunc?: ReturnTypeFunc,
);
export function RoleField(
  roles: Role[],
  options?: FieldOptions,
  returntypefunc?: ReturnTypeFunc,
) {
  return applyDecorators(
    returntypefunc
      ? Field(returntypefunc, {
          ...options,
          nullable: true,
          middleware: [checkRoleMiddleware],
        })
      : Field({
          ...options,
          nullable: true,
          middleware: [checkRoleMiddleware],
        }),
    Extensions({ roles: roles }),
  );
}
