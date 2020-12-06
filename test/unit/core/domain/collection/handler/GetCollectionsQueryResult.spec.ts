import { v4 } from 'uuid';
import { Category } from '@core/domain/collection/entity/Collection';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';

describe('GetCollectionsQueryResult', () => {
  describe('new', () => {
    test('Expect it create GetCollectionsQueryResult instance with required parameters', () => {
      const collectionId: string = v4();
      const collectionCategory = Category.CUSTOM;

      const getCollectionsQueryResult: GetCollectionsQueryResult = GetCollectionsQueryResult.new({
        id: collectionId,
        category: collectionCategory,
      });

      expect(getCollectionsQueryResult.id).toBe(collectionId);
      expect(getCollectionsQueryResult.category).toBe(collectionCategory);
    });
  });
});
