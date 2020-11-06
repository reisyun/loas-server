import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignupArgs {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
