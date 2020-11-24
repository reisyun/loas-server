import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class RemoveUserArgs {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public confirm!: boolean;
}
