import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { History, HistoryCategory } from '@core/domain/history/entity/History';
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
    mediaId: string;
    repeat: number;
    private: boolean;
    completedAt: Date;
  }>;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  public static newFromHistory(history: History): HistoryUseCaseDto {
    const dto: HistoryUseCaseDto = plainToClass(HistoryUseCaseDto, history);
    const historyItems: Array<HistoryItem> = history.getHistoryItems;

    dto.historyItems = historyItems.map((historyItem: HistoryItem) => ({
      mediaId: historyItem.getMediaId,
      repeat: historyItem.getRepeat,
      private: historyItem.getPrivate,
      completedAt: historyItem.getCompletedAt,
    }));

    return dto;
  }

  public static newListFromHistories(histories: History[]): HistoryUseCaseDto[] {
    return histories.map(history => this.newFromHistory(history));
  }
}
