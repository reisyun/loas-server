/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CollectionItemModel {
  @Field(() => ID)
  public mediaId!: string;

  @Field(() => Date)
  public updatedAt!: Date;
}
