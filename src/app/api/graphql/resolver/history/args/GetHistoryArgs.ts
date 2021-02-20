import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetHistoryArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public historyId!: string;
}
