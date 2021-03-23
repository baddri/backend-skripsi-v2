import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field()
  public full_name: string;

  @Field({ nullable: true })
  public avatar_url: string;

  @Field({ nullable: true })
  public gender: string;

  @Field({ nullable: true })
  public birth_date: Date;

  @Field({ nullable: true })
  public information: string;
}
