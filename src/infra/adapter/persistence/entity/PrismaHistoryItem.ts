import { HistoryItem, HistoryCategory, MediaStatus } from '@prisma/client';
import { Nullable } from '@core/common/Types';

export interface PrismaHistoryItem extends HistoryItem {
  history: { ownerId: string; category: HistoryCategory };
  media: { status: Nullable<MediaStatus> };
}
