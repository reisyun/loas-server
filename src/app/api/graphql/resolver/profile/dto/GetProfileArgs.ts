import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProfileArgs {
  @Field(() => Int, { nullable: true })
  public profileId?: number;

  @Field(() => ID, { nullable: true })
  public userId?: string;
}
