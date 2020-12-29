import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserPreviewModel } from '@app/api/graphql/model/UserPreviewModel';
import { CollectionItemModel } from '@app/api/graphql/model/CollectionItemModel';

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

  @Field(() => UserPreviewModel)
  public collector!: UserPreviewModel;

  @Field(() => [CollectionItemModel])
  public collectionItems!: CollectionItemModel[];
}
