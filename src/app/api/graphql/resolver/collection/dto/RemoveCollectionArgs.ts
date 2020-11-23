import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class RemoveCollectionArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => ID)
  public userId!: string;
}
