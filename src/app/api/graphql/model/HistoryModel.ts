import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { HistoryItemPreviewModel } from '@app/api/graphql/model/preview/HistoryItemPreviewModel';

registerEnumType(HistoryCategory, { name: 'HistoryCategory' });

@ObjectType()
export class HistoryModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => ID)
  public ownerId!: string;

  @Field(() => HistoryCategory)
  public category!: HistoryCategory;

  @Field(() => [HistoryItemPreviewModel], { nullable: 'items' })
  public historyItems!: HistoryItemPreviewModel[];
}
