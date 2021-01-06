import { HistoryCategory } from '@core/domain/history/entity/History';

export interface AddHistoryItemPort {
  executorId: string;
  category: HistoryCategory;
  mediaId: string;
}
