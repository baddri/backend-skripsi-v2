/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ArgsType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public full_name: string;
}
