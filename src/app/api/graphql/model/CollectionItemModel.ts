/* eslint-disable max-classes-per-file */
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CollectionItemModel {
  @Field(() => Int)
  public mediaId!: number;

  @Field(() => Date)
  public updatedAt!: Date;
}
