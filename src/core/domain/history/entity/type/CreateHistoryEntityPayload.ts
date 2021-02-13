import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { Media } from '@core/domain/history/value-object/Media';

export type CreateHistoryEntityPayload = {
  ownerId: string;
  media: Media;
  status: HistoryStatus;
  repeat?: number;
  secret?: boolean;
  completedAt?: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
