import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetLibraryArgs {
  @Field({ nullable: true })
  public libraryId!: string;

  @Field({ nullable: true })
  public userId!: string;
}
