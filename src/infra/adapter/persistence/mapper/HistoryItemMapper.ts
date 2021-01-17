import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { MediaStatus } from '@core/common/enums/MediaEnums';
import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';
import { History } from '@core/domain/historyItem/value-object/History';
import { Media } from '@core/domain/historyItem/value-object/Media';
import { PrismaHistoryItem } from '@infra/adapter/persistence/entity/PrismaHistoryItem';

export class HistoryItemMapper {
  public static toDomainEntity(orm: PrismaHistoryItem): HistoryItem {
    const domain: HistoryItem = new HistoryItem({
      id: orm.id,
      history: new History(
        orm.historyId,
        orm.history.ownerId,
        orm.history.category as HistoryCategory,
      ),
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
