import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';

registerEnumType(HistoryStatus, { name: 'HistoryStatus' });

@ObjectType()
export class HistoryModel {
  @Field(() => ID)
  public userId!: string;

  @Field(() => ID)
  public mediaId!: string;

  @Field(() => HistoryStatus)
  public status!: HistoryStatus;

  @Field({ nullable: true })
  public repeat?: number;

  @Field({ nullable: true })
  public secret?: boolean;

  @Field(() => Date, { nullable: true })
  public completedAt?: Date;
}
