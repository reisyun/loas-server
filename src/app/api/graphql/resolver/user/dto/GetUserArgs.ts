import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID, { nullable: true })
  public userId?: string;

  @Field({ nullable: true })
  public email?: string;
}
