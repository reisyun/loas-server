import { Nullable } from '@core/common/Types';
import { CollectionRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import { PrismaCollection } from '@infra/adapter/persistence/entity/PrismaCollection';
import { CollectionMapper } from '@infra/adapter/persistence/mapper/CollectionMapper';

export class CollectionRepositoryAdapter
  extends PrismaRepository
  implements CollectionRepositoryPort {
  public async findOne(args: CollectionRepositoryArgs.FindOne): Promise<Nullable<Collection>> {
    let collectionDomain: Nullable<Collection> = null;
    const collection: Nullable<PrismaCollection> = await this.collection.findUnique({
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
    const collections: PrismaCollection[] = await this.collection.findMany({
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
    const collectionItem = collection.getLatestCollectionItem;

    await this.collection.update({
      where: { id: collection.getId },
      data: {
        name: collection.getName,
        description: collection.getDescription,
        private: collection.getPrivate,

        collectionItems: {
          upsert: {
            where: {
              collectionId_mediaId: {
                collectionId: collection.getId,
                mediaId: collectionItem.getMediaId,
              },
            },
            // create: { media: { create: { title: 'anime_title' } } },
            create: { media: { connect: { id: collectionItem.getMediaId } } },
            update: { updatedAt: collectionItem.getUpdatedAt },
          },
        },
      },
    });
  }

  public async remove(collection: Collection): Promise<void> {
    await this.collection.update({
      where: { id: collection.getId },
      data: { removedAt: collection.getRemovedAt },
    });
  }

  public async deleteCollectionItem(collectionId: string, mediaId: string): Promise<void> {
    await this.collectionItem.delete({
      where: {
        collectionId_mediaId: {
          collectionId,
          mediaId,
        },
      },
    });
  }
}
