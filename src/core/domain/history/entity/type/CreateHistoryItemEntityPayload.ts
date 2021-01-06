import { Media } from '@core/domain/history/value-object/Media';

export type CreateHistoryItemEntityPayload = {
  media: Media;
  id?: string;
  repeat?: number;
  private?: boolean;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
