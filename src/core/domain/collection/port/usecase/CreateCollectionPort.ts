import { Category } from '@core/domain/collection/entity/Collection';

export interface CreateCollectionPort {
  collectorId: string;
  name: string;
  description?: string;
  category?: Category;
}
