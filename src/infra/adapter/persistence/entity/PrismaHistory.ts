import { History } from '@prisma/client';

type HistoryItem = { id: string; mediaId: string };

export interface PrismaHistory extends History {
  historyItems: Array<HistoryItem>;
}
