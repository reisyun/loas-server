import { MediaCollection as PrismaCollection } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { CollectionRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { CollectionMapper } from '@infra/adapter/collection/persistence/CollectionMapper';

export class CollectionRepositoryAdapter
  extends PrismaRepository
  implements CollectionRepositoryPort {
  public async findOne(args: CollectionRepositoryArgs.FindOne): Promise<Nullable<Collection>> {
    let collectionDomain: Nullable<Collection> = null;
    const collection: Nullable<PrismaCollection> = await this.mediaCollection.findOne(args);
    if (collection) {
      collectionDomain = CollectionMapper.toDomainEntity(collection);
    }

    return collectionDomain;
  }

  public async findMany(args?: CollectionRepositoryArgs.FindMany): Promise<Collection[]> {
    const collections: Nullable<PrismaCollection[]> = await this.mediaCollection.findMany(args);
    const collectionsDomain: Collection[] = CollectionMapper.toDomainEntities(collections);

    return collectionsDomain;
  }

  public async count(args?: CollectionRepositoryArgs.FindMany): Promise<number> {
    const countCollection: number = await this.mediaCollection.count(args);

    return countCollection;
  }

  public async create(collection: Collection): Promise<Collection> {
    const newCollection: PrismaCollection = await this.mediaCollection.create({
      data: {
        id: collection.getId,
        name: collection.getName,
        description: collection.getDescription,
        isCustom: collection.getIsCustom,
        user: { connect: { id: collection.getUserId } },
      },
    });
    const collectionDomain: Collection = CollectionMapper.toDomainEntity(newCollection);

    return collectionDomain;
  }

  public async update(collection: Collection): Promise<Collection> {
    const updateCollection: PrismaCollection = await this.mediaCollection.update({
      where: { id: collection.getId },
      data: {
        name: collection.getName,
        description: collection.getDescription,
        // soft delete
        removedAt: collection.getRemovedAt,
      },
    });
    const collectionDomain: Collection = CollectionMapper.toDomainEntity(updateCollection);

    return collectionDomain;
  }

  public async delete(collection: Collection): Promise<Collection> {
    const deleteCollection: PrismaCollection = await this.mediaCollection.delete({
      where: { id: collection.getId },
    });
    const collectionDomain: Collection = CollectionMapper.toDomainEntity(deleteCollection);

    return collectionDomain;
  }
}
