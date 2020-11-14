import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetProfileArgs {
  @Field({ nullable: true })
  public profileId!: number;

  @Field({ nullable: true })
  public userId!: string;
}
