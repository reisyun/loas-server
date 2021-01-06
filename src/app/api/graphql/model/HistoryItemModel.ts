import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class HistoryItemModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public repeat!: number;

  @Field()
  public private!: boolean;

  @Field(() => Date)
  public completedAt!: Date;

  @Field(() => ID)
  public mediaId!: string;
}
