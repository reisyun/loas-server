import { Nullable } from '@core/common/Types';
import { HistoryItemRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';

export interface HistoryItemRepositoryPort {
  findOne(args: HistoryItemRepositoryArgs.FindOne): Promise<Nullable<HistoryItem>>;

  findMany(args?: HistoryItemRepositoryArgs.FindMany): Promise<HistoryItem[]>;

  count(args?: HistoryItemRepositoryArgs.FindMany): Promise<number>;

  create(historyItem: HistoryItem): Promise<void>;

  update(historyItem: HistoryItem): Promise<void>;

  remove(historyItem: HistoryItem): Promise<void>;
}
