import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryCategory } from '@core/domain/history/entity/History';

export type CreateHistoryEntityPayload = {
  ownerId: string;
  category: HistoryCategory;
  id?: string;
  historyItems?: Array<HistoryItem>;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
