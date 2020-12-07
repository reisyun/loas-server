import { Collection as PrismaCollection } from '@prisma/client';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

export interface PrismaCollectionAggregate extends PrismaCollection {
  // collectionItems: Array<{ id: string }>;
}

export class CollectionMapper {
  public static toDomainEntity(orm: PrismaCollectionAggregate): Collection {
    const domain: Collection = new Collection({
      id: orm.id,
      name: orm.name,
      description: orm.description as string,
      category: orm.category as Category,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,

      // Sub domain
      collector: new Collector(orm.id, orm.name),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollectionAggregate[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
