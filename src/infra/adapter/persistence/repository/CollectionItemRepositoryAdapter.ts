import { Nullable } from '@core/common/Types';
import { CollectionItemRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { CollectionItem } from '@core/domain/collectionItem/entity/CollectionItem';
import { CollectionItemRepositoryPort } from '@core/domain/collectionItem/port/persistence/CollectionItemRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import {
  CollectionItemMapper,
  PrismaCollectionItemAggregate,
} from '@infra/adapter/persistence/mapper/CollectionItemMapper';

export class CollectionItemRepositoryAdapter
  extends PrismaRepository
  implements CollectionItemRepositoryPort {
  public async findOne(
    args: CollectionItemRepositoryArgs.FindOne,
  ): Promise<Nullable<CollectionItem>> {
    let collectionItemDomain: Nullable<CollectionItem> = null;
    const collectionItem: Nullable<PrismaCollectionItemAggregate> = await this.collectionItem.findUnique(
      {
        ...args,
        include: { collection: { select: { id: true, category: true } } },
      },
    );
    if (collectionItem) {
      collectionItemDomain = CollectionItemMapper.toDomainEntity(collectionItem);
    }

    return collectionItemDomain;
  }

  public async findMany(args?: CollectionItemRepositoryArgs.FindMany): Promise<CollectionItem[]> {
    const collectionItems: PrismaCollectionItemAggregate[] = await this.collectionItem.findMany({
      ...args,
      include: { collection: { select: { id: true, category: true } } },
    });
    const collectionItemsDomain: CollectionItem[] = CollectionItemMapper.toDomainEntities(
      collectionItems,
    );

    return collectionItemsDomain;
  }

  public async count(args?: CollectionItemRepositoryArgs.FindMany): Promise<number> {
    const countCollectionItem: number = await this.collectionItem.count(args);

    return countCollectionItem;
  }

  public async create(collectionItem: CollectionItem): Promise<void> {
    await this.collectionItem.create({
      data: {
        id: collectionItem.getId,
        private: collectionItem.getPrivate,
        completedAt: collectionItem.getCompletedAt,
        like: collectionItem.getLike,
        repeat: collectionItem.getRepeat,

        collection: { connect: { id: collectionItem.getCollection.getId } },
        // TODO: Connect media id
        media: { create: { title: 'mockTitle' } },
      },
    });
  }

  public async update(collectionItem: CollectionItem): Promise<void> {
    await this.collectionItem.update({
      where: { id: collectionItem.getId },
      data: {
        private: collectionItem.getPrivate,
        completedAt: collectionItem.getCompletedAt,
        like: collectionItem.getLike,
        repeat: collectionItem.getRepeat,

        collection: { connect: { id: collectionItem.getCollection.getId } },
      },
    });
  }

  public async remove(collectionItem: CollectionItem): Promise<void> {
    await this.collectionItem.delete({ where: { id: collectionItem.getId } });
  }
}
