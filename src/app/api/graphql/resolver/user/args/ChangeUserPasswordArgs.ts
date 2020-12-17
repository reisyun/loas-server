import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class ChangeUserPasswordArgs {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public oldPassword!: string;

  @Field()
  public newPassword!: string;
}
