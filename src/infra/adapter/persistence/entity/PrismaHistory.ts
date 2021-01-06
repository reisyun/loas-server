import { History, HistoryItem } from '@prisma/client';

export interface PrismaHistory extends History {
  historyItems: Array<HistoryItem>;
}
