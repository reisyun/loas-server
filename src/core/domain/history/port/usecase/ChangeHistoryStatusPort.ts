import { HistoryStatus } from '@core/common/enums/HistoryEnums';

export interface ChangeHistoryStatusPort {
  executorId: string;
  historyId: string;
  status: HistoryStatus;
}
