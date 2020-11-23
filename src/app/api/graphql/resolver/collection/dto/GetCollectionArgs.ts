import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetCollectionArgs {
  @Field(() => ID, { nullable: true })
  public collectionId?: string;

  @Field(() => ID, { nullable: true })
  public userId?: string;
}
