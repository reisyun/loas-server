import { HistoryCategory } from '@core/domain/historyItem/value-object/History';

export interface AddHistoryItemPort {
  executorId: string;
  category: HistoryCategory;
  mediaId: string;
}
