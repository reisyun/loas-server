import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetLibraryArgs {
  @Field(() => ID, { nullable: true })
  public libraryId?: string;

  @Field(() => ID, { nullable: true })
  public userId?: string;
}
