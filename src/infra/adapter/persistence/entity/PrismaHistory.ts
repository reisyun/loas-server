import { History, HistoryItem } from '@prisma/client';

export interface PrismaHistory extends History {
  owner: { id: string; name: string };
  historyItems: Array<HistoryItem>;
}
