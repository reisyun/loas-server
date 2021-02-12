import { HistoryStatus } from '@core/common/enums/HistoryEnums';

export type CreateHistoryEntityPayload = {
  userId: string;
  mediaId: string;
  status: HistoryStatus;
  repeat?: number;
  secret?: boolean;
  completedAt?: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
