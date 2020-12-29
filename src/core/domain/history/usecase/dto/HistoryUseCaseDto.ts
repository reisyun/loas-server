import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { History, HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

@Exclude()
export class HistoryUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public category!: HistoryCategory;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  @Expose()
  public owner!: {
    id: string;
    name: string;
  };

  @Expose()
  public historyItems!: Array<{
    id: string;
    repeat: number;
    private: boolean;
    completedAt: Date;
    mediaId: string;
  }>;

  public static newFromHistory(history: History): HistoryUseCaseDto {
    const dto: HistoryUseCaseDto = plainToClass(HistoryUseCaseDto, history);
    const owner: HistoryOwner = history.getOwner;
    const historyItems: Array<HistoryItem> = history.getHistoryItems;

    dto.owner = {
      id: owner.getId,
      name: owner.getName,
    };

    dto.historyItems = historyItems.map((historyItem: HistoryItem) => ({
      id: historyItem.getId,
      repeat: historyItem.getRepeat,
      private: historyItem.getPrivate,
      completedAt: historyItem.getCompletedAt,
      mediaId: historyItem.getMediaId,
    }));

    return dto;
  }

  public static newListFromHistories(histories: History[]): HistoryUseCaseDto[] {
    return histories.map(history => this.newFromHistory(history));
  }
}
