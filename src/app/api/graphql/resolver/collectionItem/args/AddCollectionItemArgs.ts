import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class AddCollectionItemArgs {
  @Field(() => ID)
  public collectionId!: string;

  @Field({ nullable: true })
  public private?: boolean;

  @Field({ nullable: true })
  public completedAt?: Date;

  @Field({ nullable: true })
  public like?: boolean;

  @Field({ nullable: true })
  public repeat?: number;
}
