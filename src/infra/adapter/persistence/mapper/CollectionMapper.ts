import { Collection as PrismaCollection } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';

export interface PrismaCollectionAggregate extends PrismaCollection {
  // deletedCollect로 옮길 수 있기 때문에 Nullable
  collector: Nullable<{ id: string; name: string }>;
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
      collector: new Collector(orm.collector?.id as string, orm.collector?.name as string),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollectionAggregate[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
