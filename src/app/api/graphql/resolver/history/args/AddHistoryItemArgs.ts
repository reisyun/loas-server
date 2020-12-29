import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class AddHistoryItemArgs {
  @Field(() => ID)
  public historyId!: string;

  @Field(() => ID)
  public mediaId!: string;
}
