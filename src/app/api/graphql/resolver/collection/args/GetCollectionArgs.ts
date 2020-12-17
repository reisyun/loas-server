import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetCollectionArgs {
  @Field(() => ID)
  public executorId!: string;

  @Field(() => ID)
  public collectionId!: string;
}
