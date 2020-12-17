import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class EditCollectionArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => ID)
  public userId!: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;
}
