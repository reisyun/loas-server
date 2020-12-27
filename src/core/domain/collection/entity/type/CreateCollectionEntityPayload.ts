import { CollectionItem } from '@core/domain/collection/value-object/CollectionItem';
import { Collector } from '@core/domain/collection/value-object/Collector';

export type CreateCollectionEntityPayload = {
  collector: Collector;
  name: string;
  id?: string;
  description?: string;
  private?: boolean;
  collectionItems?: Array<CollectionItem>;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
