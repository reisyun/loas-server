import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateLibraryArgs {
  @Field()
  public userId!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public private?: boolean;
}
