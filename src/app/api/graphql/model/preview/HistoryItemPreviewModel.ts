import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class HistoryItemPreviewModel {
  @Field(() => ID)
  public id!: string;

  @Field(() => ID)
  public mediaId!: string;
}
