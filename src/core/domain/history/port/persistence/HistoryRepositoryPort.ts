import { Nullable } from '@core/common/Types';
import { HistoryRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { History } from '@core/domain/history/entity/History';

export interface HistoryRepositoryPort {
  findOne(args: HistoryRepositoryArgs.FindOne): Promise<Nullable<History>>;

  findMany(args?: HistoryRepositoryArgs.FindMany): Promise<History[]>;

  count(args?: HistoryRepositoryArgs.FindMany): Promise<number>;

  create(history: History): Promise<void>;

  update(history: History): Promise<void>;

  remove(history: History): Promise<void>;
}
