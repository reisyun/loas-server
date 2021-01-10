import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserPreviewModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;
}
