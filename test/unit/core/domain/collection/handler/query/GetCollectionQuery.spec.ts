import { v4 } from 'uuid';
import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';

describe('GetCollectionQuery', () => {
  describe('new', () => {
    test('Expect it create GetCollectionQuery instance with required parameters', () => {
      const where: { id: string } = { id: v4() };

      const getCollectionQuery: GetCollectionQuery = GetCollectionQuery.new(where);

      expect(getCollectionQuery.where).toEqual(where);
    });
  });
});
