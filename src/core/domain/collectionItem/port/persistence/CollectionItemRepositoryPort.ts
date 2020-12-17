import { Nullable } from '@core/common/Types';
import { CollectionItemRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { CollectionItem } from '@core/domain/collectionItem/entity/CollectionItem';

export interface CollectionItemRepositoryPort {
  findOne(args: CollectionItemRepositoryArgs.FindOne): Promise<Nullable<CollectionItem>>;

  findMany(args?: CollectionItemRepositoryArgs.FindMany): Promise<CollectionItem[]>;

  count(args?: CollectionItemRepositoryArgs.FindMany): Promise<number>;

  create(collectionItem: CollectionItem): Promise<void>;

  update(collectionItem: CollectionItem): Promise<void>;

  remove(collectionItem: CollectionItem): Promise<void>;
}
