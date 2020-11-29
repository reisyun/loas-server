import { Collection as PrismaCollection } from '@prisma/client';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

export class CollectionMapper {
  public static toOrmEntity(domain: Collection): PrismaCollection {
    const orm: PrismaCollection = {
      id: domain.getId,
      collectorId: domain.getCollector.getId,
      deletedCollectorId: domain.getCollector.getId,
      name: domain.getName,
      description: domain.getDescription,
      category: domain.getCategory,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,
      removedAt: domain.getRemovedAt,
    };

    return orm;
  }

  public static toOrmEntities(domains: Collection[]): PrismaCollection[] {
    return domains.map(orm => this.toOrmEntity(orm));
  }

  public static toDomainEntity(orm: PrismaCollection): Collection {
    const domain: Collection = new Collection({
      collector: new Collector(orm.id, orm.name),
      id: orm.id,
      name: orm.name,
      description: orm.description as string,
      category: orm.category as Category,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollection[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
