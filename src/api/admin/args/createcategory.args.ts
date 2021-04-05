import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateCategoryArgs {
  @Field()
  public title: string;

  @Field()
  public description: string;

  @Field()
  public icon_url: string;
}
