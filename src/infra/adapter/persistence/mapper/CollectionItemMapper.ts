import {
  CollectionItem as PrismaCollectionItem,
  CollectionCategory as PrismaCollectionCategory,
} from '@prisma/client';
import { CollectionItem } from '@core/domain/collectionItem/entity/CollectionItem';
import { Collection } from '@core/domain/collectionItem/value-object/Collection';
import { Category } from '@core/domain/collection/entity/Collection';

export interface PrismaCollectionItemAggregate extends PrismaCollectionItem {
  collection: { id: string; category: PrismaCollectionCategory };
}

export class CollectionItemMapper {
  public static toDomainEntity(orm: PrismaCollectionItemAggregate): CollectionItem {
    const domain: CollectionItem = new CollectionItem({
      id: orm.id,
      private: orm.private,
      completedAt: orm.completedAt,
      like: orm.like as boolean,
      repeat: orm.repeat,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,

      // Sub domain
      collection: new Collection(orm.collection.id, orm.collection.category as Category),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollectionItemAggregate[]): CollectionItem[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
