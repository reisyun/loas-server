import { Category } from '@core/domain/history/entity/History';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

export type CreateHistoryEntityPayload = {
  owner: HistoryOwner;
  category: Category;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
