import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class RemoveHistoryItemArgs {
  @Field(() => ID)
  public ownerId!: string;

  @Field(() => ID)
  public historyItemId!: string;
}
