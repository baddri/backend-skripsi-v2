import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { Role } from 'constants/Role';
import { RolesGuard, ROLES_KEY } from 'api/auth/guards/roles.guard';

export function Roles(...roles: Role[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
}
