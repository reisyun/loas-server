import { ArgsType, Field, ID } from '@nestjs/graphql';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';


@ArgsType()
export class AddHistoryItemArgs {
  @Field(() => ID)
  public ownerId!: string;

  @Field(() => HistoryCategory)
  public category!: HistoryCategory;

  @Field(() => ID)
  public mediaId!: string;
}
