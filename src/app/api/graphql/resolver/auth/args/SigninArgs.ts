import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SigninArgs {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
