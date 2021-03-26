import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'api/user/user.service';
import { User } from 'api/user/schemas/user.schema';
import { WrongPassword } from 'errors/WrongPassword';
import { Public } from 'decorators/Public';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserWithEmail(email);
    if (!(await User.comparePassword(user, password)))
      throw new WrongPassword();
    return this.jwtService.sign({
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      is_instructor: user.is_instructor,
      is_banned: user.is_banned,
    });
  }
}
