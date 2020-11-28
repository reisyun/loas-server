import { Category } from '@core/domain/collection/entity/Collection';

export type CreateCollectionEntityPayload = {
  collectorId: string;
  name: string;
  id?: string;
  description?: string;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
