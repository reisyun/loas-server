import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CreateCollectionArgs {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public private?: boolean;
}
