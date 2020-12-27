/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CollectionItemModel } from '@app/api/graphql/model/CollectionItemModel';

@ObjectType()
export class CollectorPreviewModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;
}

@ObjectType()
export class CollectionModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public private!: boolean;

  @Field(() => CollectorPreviewModel)
  public collector!: CollectorPreviewModel;

  @Field(() => [CollectionItemModel])
  public collectionItems!: CollectionItemModel[];
}
