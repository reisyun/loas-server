import { HistoryCategory } from '@core/common/enums/HistoryEnums';

export type CreateHistoryEntityPayload = {
  mediaId: string;
  categories: HistoryCategory[];
  repeat?: number;
  private?: boolean;
  completedAt?: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
