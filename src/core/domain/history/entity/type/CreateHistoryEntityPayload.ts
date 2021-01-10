import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { HistoryItem } from '@core/domain/history/value-object/HistoryItem';

export type CreateHistoryEntityPayload = {
  ownerId: string;
  category: HistoryCategory;
  id?: string;
  historyItems?: Array<HistoryItem>;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
