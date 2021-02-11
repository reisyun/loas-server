import { HistoryStatus } from '@core/common/enums/HistoryEnums';

export type CreateHistoryEntityPayload = {
  id: number;
  userId: string;
  mediaId: string;
  status: HistoryStatus;
  repeat?: number;
  secret?: boolean;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
