import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProfileArgs {
  @Field(() => Int, { nullable: true })
  public profileId?: number;
}
