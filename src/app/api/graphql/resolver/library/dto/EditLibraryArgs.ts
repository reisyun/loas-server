import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class EditLibraryArgs {
  @Field(() => ID)
  public libraryId!: string;

  @Field(() => ID)
  public userId!: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public private?: boolean;
}
