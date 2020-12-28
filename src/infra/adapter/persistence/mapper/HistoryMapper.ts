import { History as PrismaHistory } from '@prisma/client';
import { History, Category } from '@core/domain/history/entity/History';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

export interface PrismaHistoryAggregate extends PrismaHistory {
  owner: { id: string; name: string };
}

export class HistoryMapper {
  public static toDomainEntity(orm: PrismaHistoryAggregate): History {
    const domain: History = new History({
      id: orm.id,
      category: orm.category as Category,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,

      // Sub domain
      owner: new HistoryOwner(orm.owner.id, orm.owner.name),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaHistoryAggregate[]): History[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
