import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetCollectionListArgs {
  @Field(() => ID, { nullable: true })
  public userId?: string;


  @Field({ nullable: true })
  public name?: string;
}
