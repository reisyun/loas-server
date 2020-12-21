import { Nullable } from '@core/common/Types';
import { CollectionRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Collection } from '@core/domain/collection/entity/Collection';
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
      include: { collector: { select: { id: true, name: true } } },
    });
    if (collection) {
      collectionDomain = CollectionMapper.toDomainEntity(collection);
    }

    return collectionDomain;
  }

  public async findMany(args?: CollectionRepositoryArgs.FindMany): Promise<Collection[]> {
    const collections: PrismaCollectionAggregate[] = await this.collection.findMany({
      ...args,
      include: { collector: { select: { id: true, name: true } } },
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
        category: collection.getCategory,

        collector: { connect: { id: collection.getCollector.getId } },
      },
    });
  }

  public async update(collection: Collection): Promise<void> {
    await this.collection.update({
      where: { id: collection.getId },
      data: {
        name: collection.getName,
        description: collection.getDescription,
        // soft delete
        removedAt: collection.getRemovedAt,
      },
    });
  }
}
