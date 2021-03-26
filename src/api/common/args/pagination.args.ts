/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsPositive, IsInt } from 'class-validator';

@ArgsType()
export class Pagination {
  @IsInt()
  @IsPositive()
  @Field(type => Int, { nullable: true })
  public limit?: number;

  @IsInt()
  @IsPositive()
  @Field(type => Int, { nullable: true })
  public offset?: number;
}
