import { Roles } from 'constants/Roles';

export class UserPayload {
  constructor(
    public email: string,
    public role: Roles,
    public email_verified: boolean,
    public is_instructor: boolean,
    public is_banned: boolean,
  ) {}
  public iat!: number;
  public exp!: number;
}
