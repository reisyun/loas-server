import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class AddCollectionItemArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => Int)
  public mediaId!: number;
}
