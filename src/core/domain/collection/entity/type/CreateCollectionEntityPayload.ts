import { Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

export type CreateCollectionEntityPayload = {
  collector: Collector;
  name: string;
  id?: string;
  description?: string;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
