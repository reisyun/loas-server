import { HistoryStatus } from '@core/common/enums/HistoryEnums';

export interface GetHistoryListPort {
  executorId: string;
  ownerId?: string;
  status?: HistoryStatus;
}
