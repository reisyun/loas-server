import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class RestoreLibraryArgs {
  @Field(() => ID)
  public libraryId!: string;

  @Field(() => ID)
  public userId!: string;
}
