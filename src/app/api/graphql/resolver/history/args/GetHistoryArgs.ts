import { ArgsType, Field, ID } from '@nestjs/graphql';
import { HistoryCategory } from '@core/domain/history/entity/History';

@ArgsType()
export class GetHistoryArgs {
  @Field(() => ID)
  public ownerId!: string;

  @Field(() => HistoryCategory)
  public category!: HistoryCategory;
}
