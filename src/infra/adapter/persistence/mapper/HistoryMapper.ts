import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { History } from '@core/domain/history/entity/History';
import { Media } from '@core/domain/history/value-object/Media';
import { PrismaHistory } from '@infra/adapter/persistence/entity/PrismaHistory';

export class HistoryMapper {
  public static toDomainEntity(orm: PrismaHistory): History {
    const domain: History = new History({
      media: new Media(orm.mediaId),
      ownerId: orm.userId,
      status: orm.status as HistoryStatus,
      repeat: orm.repeat,
      secret: orm.secret,
      id: orm.id,
      completedAt: orm.completedAt,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaHistory[]): History[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
