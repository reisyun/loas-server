import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class RemoveHistoryArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public historyId!: string;
}
