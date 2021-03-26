/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ArgsType, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @IsEmail()
  @Field()
  public email: string;

  @MinLength(8)
  @Field()
  public password: string;

  @Field()
  public full_name: string;
}
