import { HistoryCategory } from '@core/common/enums/HistoryEnums';

export interface GetHistoryPort {
  executorId: string;
  category: HistoryCategory;
}
