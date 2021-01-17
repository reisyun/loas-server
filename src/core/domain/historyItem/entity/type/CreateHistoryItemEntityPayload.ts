import { History } from '@core/domain/historyItem/value-object/History';
import { Media } from '@core/domain/historyItem/value-object/Media';

export type CreateHistoryItemEntityPayload = {
  history: History;
  media: Media;
  id?: string;
  repeat?: number;
  private?: boolean;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
