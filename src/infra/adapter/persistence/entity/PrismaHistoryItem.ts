import { HistoryItem, HistoryCategory, MediaStatus } from '@prisma/client';

export interface PrismaHistoryItem extends HistoryItem {
  history: { ownerId: string; category: HistoryCategory };
  media: { status: MediaStatus };
}
