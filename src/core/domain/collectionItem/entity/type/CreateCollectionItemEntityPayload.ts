import { Collection } from '@core/domain/collectionItem/value-object/Collection';

export type CreateCollectionItemEntityPayload = {
  collection: Collection;
  id?: string;
  like?: boolean;
  private?: boolean;
  repeat?: number;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
