import { ArgsType, Field, ID } from '@nestjs/graphql';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';

@ArgsType()
export class ChangeHistoryStatusArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public historyId!: string;

  @Field(() => HistoryStatus)
  public status!: HistoryStatus;
}
