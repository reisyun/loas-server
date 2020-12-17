import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CollectionItemModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public private!: boolean;

  @Field()
  public completedAt!: Date;

  @Field({ nullable: true })
  public like?: boolean;

  @Field()
  public repeat!: number;
}
