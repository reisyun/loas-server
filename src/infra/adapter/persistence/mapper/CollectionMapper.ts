import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionItem } from '@core/domain/collection/value-object/CollectionItem';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { PrismaCollection } from '@infra/adapter/persistence/entity/PrismaCollection';

export class CollectionMapper {
  public static toDomainEntity(orm: PrismaCollection): Collection {
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
        collectionItem =>
          new CollectionItem(
            collectionItem.mediaId,
            collectionItem.createdAt,
            collectionItem.updatedAt,
          ),
      ),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollection[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
