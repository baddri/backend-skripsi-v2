import { applyDecorators, UseGuards } from '@nestjs/common';

import { EmailVerifiedGuard } from 'api/auth/email-verified.guard';

export function EmailVerified() {
  return applyDecorators(UseGuards(EmailVerifiedGuard));
}
