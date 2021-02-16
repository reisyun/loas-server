import { ArgsType, Field, ID } from '@nestjs/graphql';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';

@ArgsType()
export class GetHistoryListArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID, { nullable: true })
  public ownerId?: string;

  @Field(() => HistoryStatus, { nullable: true })
  public status?: HistoryStatus;
}
