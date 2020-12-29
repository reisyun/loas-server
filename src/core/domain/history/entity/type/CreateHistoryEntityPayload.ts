import { HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

export type CreateHistoryEntityPayload = {
  owner: HistoryOwner;
  category: HistoryCategory;
  id?: string;
  historyItems?: Array<HistoryItem>;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
