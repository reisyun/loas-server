import { HistoryCategory } from '@core/domain/history/entity/History';

export interface GetHistoryPort {
  executorId: string;
  category: HistoryCategory;
}
