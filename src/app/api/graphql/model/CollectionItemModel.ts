/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '@core/domain/collection/entity/Collection';

@ObjectType()
export class CollectionPreviewModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => Category)
  public category!: Category;
}

@ObjectType()
export class CollectionItemModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public private!: boolean;

  @Field()
  public completedAt!: Date;

  @Field({ nullable: true })
  public like?: boolean;

  @Field()
  public repeat!: number;

  @Field(() => CollectionPreviewModel)
  public collector!: CollectionPreviewModel;
}
