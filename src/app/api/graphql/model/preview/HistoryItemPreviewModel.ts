import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class HistoryItemPreviewModel {
  @Field(() => Int)
  public repeat!: number;

  @Field()
  public private!: boolean;

  @Field(() => Date)
  public completedAt!: Date;

  @Field(() => ID)
  public mediaId!: string;
}
