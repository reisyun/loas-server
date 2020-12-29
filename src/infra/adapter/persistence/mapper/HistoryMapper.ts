import { History as PrismaHistory, HistoryItem as PrismaHistoryItem } from '@prisma/client';
import { History, HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

export interface PrismaHistoryAggregate extends PrismaHistory {
  owner: { id: string; name: string };
  historyItems: Array<PrismaHistoryItem>;
}

export class HistoryMapper {
  public static toDomainEntity(orm: PrismaHistoryAggregate): History {
    const domain: History = new History({
      id: orm.id,
      category: orm.category as HistoryCategory,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,

      // Sub domain
      owner: new HistoryOwner(orm.owner.id, orm.owner.name),
      historyItems: orm.historyItems.map(
        historyItem =>
          new HistoryItem(
            historyItem.mediaId,
            historyItem.repeat,
            historyItem.private,
            historyItem.completedAt,
            historyItem.createdAt,
            historyItem.updatedAt,
            historyItem.removedAt as Date,
            historyItem.id,
          ),
      ),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaHistoryAggregate[]): History[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
