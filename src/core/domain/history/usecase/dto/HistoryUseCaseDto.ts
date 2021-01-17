import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { History } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/value-object/HistoryItem';

@Exclude()
export class HistoryUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public ownerId!: string;

  @Expose()
  public category!: HistoryCategory;

  @Expose()
  public historyItems!: Array<{
    id: string;
    mediaId: string;
  }>;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  public static newFromHistory(history: History): HistoryUseCaseDto {
    const dto: HistoryUseCaseDto = plainToClass(HistoryUseCaseDto, history);
    const historyItems: Array<HistoryItem> = history.getHistoryItems;

    dto.historyItems = historyItems.map((historyItem: HistoryItem) => ({
      id: historyItem.getId,
      mediaId: historyItem.getMediaId,
    }));

    return dto;
  }

  public static newListFromHistories(histories: History[]): HistoryUseCaseDto[] {
    return histories.map(history => this.newFromHistory(history));
  }
}
