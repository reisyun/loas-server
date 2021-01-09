import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';

@Exclude()
export class HistoryItemUseCaseDto {
  @Expose()
  public mediaId!: string;

  @Expose()
  public repeat!: number;

  @Expose()
  public private!: boolean;

  @Expose()
  public completedAt!: Date;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  public static newFromHistory(historyItem: HistoryItem): HistoryItemUseCaseDto {
    const dto: HistoryItemUseCaseDto = plainToClass(HistoryItemUseCaseDto, historyItem);

    return dto;
  }

  public static newListFromHistories(historyItems: HistoryItem[]): HistoryItemUseCaseDto[] {
    return historyItems.map(historyItem => this.newFromHistory(historyItem));
  }
}
