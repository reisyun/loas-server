import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';
import { History, HistoryCategory } from '@core/domain/historyItem/value-object/History';
import { Media, MediaStatus } from '@core/domain/historyItem/value-object/Media';
import { PrismaHistoryItem } from '@infra/adapter/persistence/entity/PrismaHistoryItem';

export class HistoryItemMapper {
  public static toDomainEntity(orm: PrismaHistoryItem): HistoryItem {
    const domain: HistoryItem = new HistoryItem({
      id: orm.id,
      history: new History(orm.history.ownerId, orm.history.category as HistoryCategory),
      media: new Media(orm.mediaId, orm.media.status as MediaStatus),
      repeat: orm.repeat,
      private: orm.private,
      completedAt: orm.completedAt,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaHistoryItem[]): HistoryItem[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
