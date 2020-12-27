import { Nullable } from '@core/common/Types';
import { CollectionRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionItem } from '@core/domain/collection/value-object/CollectionItem';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import {
  CollectionMapper,
  PrismaCollectionAggregate,
} from '@infra/adapter/persistence/mapper/CollectionMapper';

export class CollectionRepositoryAdapter
  extends PrismaRepository
  implements CollectionRepositoryPort {
  public async findOne(args: CollectionRepositoryArgs.FindOne): Promise<Nullable<Collection>> {
    let collectionDomain: Nullable<Collection> = null;
    const collection: Nullable<PrismaCollectionAggregate> = await this.collection.findUnique({
      ...args,
      include: {
        collector: { select: { id: true, name: true } },
        collectionItems: true,
      },
    });
    if (collection) {
      collectionDomain = CollectionMapper.toDomainEntity(collection);
    }

    return collectionDomain;
  }

  public async findMany(args?: CollectionRepositoryArgs.FindMany): Promise<Collection[]> {
    const collections: PrismaCollectionAggregate[] = await this.collection.findMany({
      ...args,
      include: {
        collector: { select: { id: true, name: true } },
        collectionItems: true,
      },
    });
    const collectionsDomain: Collection[] = CollectionMapper.toDomainEntities(collections);

    return collectionsDomain;
  }

  public async count(args?: CollectionRepositoryArgs.FindMany): Promise<number> {
    const countCollection: number = await this.collection.count(args);

    return countCollection;
  }

  public async create(collection: Collection): Promise<void> {
    await this.collection.create({
      data: {
        id: collection.getId,
        name: collection.getName,
        description: collection.getDescription,
        private: collection.getPrivate,

        collector: {
          connect: { id: collection.getCollector.getId },
        },
      },
    });
  }

  public async update(collection: Collection): Promise<void> {
    await this.collection.update({
      where: { id: collection.getId },
      data: {
        name: collection.getName,
        description: collection.getDescription,
        private: collection.getPrivate,

        collectionItems: {
          upsert: {
            where: { mediaId: collection.getLatestCollectionItem.getMediaId },
            // create: { media: { create: { title: 'anime_title' } } },
            create: { media: { connect: { id: collection.getLatestCollectionItem.getMediaId } } },
            update: { updatedAt: collection.getLatestCollectionItem.getUpdatedAt },
          },
        },
      },
    });
  }

  public async remove(domain: Collection | CollectionItem): Promise<void> {
    if (domain instanceof Collection) {
      await this.collection.update({
        where: { id: domain.getId },
        data: { removedAt: domain.getRemovedAt },
      });
    }
    // TODO: Collection ID 가져올 수 있도록 구안하기
    if (domain instanceof CollectionItem) {
      await this.collection.update({
        where: { id: domain.getMediaId },
        data: {
          collectionItems: {
            delete: { mediaId: domain.getMediaId },
          },
        },
      });
    }
  }
}
