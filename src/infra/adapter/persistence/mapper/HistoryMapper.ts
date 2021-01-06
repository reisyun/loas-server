import { History, HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { Media } from '@core/domain/history/value-object/Media';
import { PrismaHistory } from '@infra/adapter/persistence/entity/PrismaHistory';

export class HistoryMapper {
  public static toDomainEntity(orm: PrismaHistory): History {
    const domain: History = new History({
      id: orm.id,
      category: orm.category as HistoryCategory,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,

      // Sub domain
      ownerId: orm.ownerId,
      historyItems: orm.historyItems.map(
        historyItem =>
          new HistoryItem(
            new Media(historyItem.mediaId),
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

  public static toDomainEntities(orms: PrismaHistory[]): History[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
