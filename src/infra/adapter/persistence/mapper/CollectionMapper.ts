import {
  Collection as PrismaCollection,
  CollectionItem as PrismaCollectionItem,
} from '@prisma/client';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionItem } from '@core/domain/collection/entity/CollectionItem';
import { Collector } from '@core/domain/collection/value-object/Collector';

export interface PrismaCollectionAggregate extends PrismaCollection {
  collector: { id: string; name: string };
  collectionItems: Array<PrismaCollectionItem>;
}

export class CollectionMapper {
  public static toDomainEntity(orm: PrismaCollectionAggregate): Collection {
    const domain: Collection = new Collection({
      id: orm.id,
      name: orm.name,
      description: orm.description as string,
      private: orm.private,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,

      // Sub domain
      collector: new Collector(orm.collector.id, orm.collector.name),
      collectionItems: orm.collectionItems.map(
        collection =>
          new CollectionItem(
            collection.mediaId,
            collection.id,
            collection.createdAt,
            collection.updatedAt,
          ),
      ),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollectionAggregate[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
