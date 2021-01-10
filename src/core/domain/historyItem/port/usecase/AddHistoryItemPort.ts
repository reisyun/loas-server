import { HistoryCategory } from '@core/common/enums/HistoryEnums';

export interface AddHistoryItemPort {
  executorId: string;
  category: HistoryCategory;
  mediaId: string;
}
