import { HistoryStatus } from '@core/common/enums/HistoryEnums';

export interface CreateHistoryPort {
  executorId: string;
  mediaId: string;
  status: HistoryStatus;
  repeat?: number;
  secret?: boolean;
  completedAt?: Date;
}
