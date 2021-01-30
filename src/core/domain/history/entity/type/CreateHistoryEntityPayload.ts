import { HistoryCategory } from '@core/common/enums/HistoryEnums';

export type CreateHistoryEntityPayload = {
  categories: HistoryCategory[];
  repeat?: number;
  private?: boolean;
  completedAt?: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
