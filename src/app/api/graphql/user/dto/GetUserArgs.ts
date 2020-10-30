import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  email?: string;
}
