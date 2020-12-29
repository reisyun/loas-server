import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserPreviewModel } from '@app/api/graphql/model/UserPreviewModel';
import { HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItemModel } from '@app/api/graphql/model/HistoryItemModel';

registerEnumType(HistoryCategory, { name: 'HistoryCategory' });

@ObjectType()
export class HistoryModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => UserPreviewModel)
  public owner!: UserPreviewModel;

  @Field(() => HistoryCategory)
  public category!: HistoryCategory;

  @Field(() => [HistoryItemModel])
  public collectionItems!: HistoryItemModel[];
}
