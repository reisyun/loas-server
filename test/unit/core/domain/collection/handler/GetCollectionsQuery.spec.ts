import { v4 } from 'uuid';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';

describe('GetCollectionsQuery', () => {
  describe('new', () => {
    test('Expect it create GetCollectionsQuery instance with required parameters', () => {
      const where: { collectionId?: string; collectorId?: string } = {
        collectionId: v4(),
        collectorId: v4(),
      };

      const getCollectionsQuery: GetCollectionsQuery = GetCollectionsQuery.new(where);

      expect(getCollectionsQuery.where).toEqual(where);
    });
  });
});
