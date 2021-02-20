import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class EditHistoryArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public historyId!: string;

  @Field({ nullable: true })
  public repeat?: number;

  @Field({ nullable: true })
  public secret?: boolean;

  @Field(() => Date, { nullable: true })
  public completedAt?: Date;
}
