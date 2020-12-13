import { v4 } from 'uuid';
import { Category } from '@core/domain/collection/entity/Collection';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';

describe('GetCollectionQueryResult', () => {
  describe('new', () => {
    test('Expect it create GetCollectionQueryResult instance with required parameters', () => {
      const collectionId: string = v4();
      const collectionCategory = Category.CUSTOM;

      const getCollectionQueryResult: GetCollectionQueryResult = GetCollectionQueryResult.new({
        id: collectionId,
        category: collectionCategory,
      });

      expect(getCollectionQueryResult.id).toBe(collectionId);
      expect(getCollectionQueryResult.category).toBe(collectionCategory);
    });
  });
});
