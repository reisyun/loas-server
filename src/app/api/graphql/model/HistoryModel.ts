/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItemModel } from '@app/api/graphql/model/HistoryItemModel';

registerEnumType(HistoryCategory, { name: 'HistoryCategory' });

@ObjectType()
export class OwnerPreviewModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;
}

@ObjectType()
export class HistoryModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => HistoryCategory)
  public category!: HistoryCategory;

  @Field(() => OwnerPreviewModel)
  public owner!: OwnerPreviewModel;

  @Field(() => [HistoryItemModel])
  public collectionItems!: HistoryItemModel[];
}
