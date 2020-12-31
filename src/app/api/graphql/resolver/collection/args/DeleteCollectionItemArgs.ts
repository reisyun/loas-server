import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteCollectionItemArgs {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public collectionId!: string;

  @Field(() => ID)
  public mediaId!: string;
}
