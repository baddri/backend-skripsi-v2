import { ArgsType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@ArgsType()
export class ChangePasswordArgs {
  @Field()
  public oldPassword: string;

  @MinLength(8)
  @Field()
  public newPassword: string;
}
