import { Nullable } from '@core/common/Types';
import { CollectionRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Collection } from '@core/domain/collection/entity/Collection';

export interface CollectionRepositoryPort {
  findOne(args: CollectionRepositoryArgs.FindOne): Promise<Nullable<Collection>>;

  findMany(args?: CollectionRepositoryArgs.FindMany): Promise<Collection[]>;

  count(args?: CollectionRepositoryArgs.FindMany): Promise<number>;

  create(collection: Collection): Promise<void>;

  update(collection: Collection): Promise<void>;

  remove(collection: Collection): Promise<void>;

  deleteCollectionItem(collectionId: string, mediaId: string): Promise<void>;
}
