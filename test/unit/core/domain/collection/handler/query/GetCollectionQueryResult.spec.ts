import { v4 } from 'uuid';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';

describe('GetCollectionQueryResult', () => {
  describe('new', () => {
    test('Expect it create GetCollectionQueryResult instance with required parameters', () => {
      const collectionId: string = v4();
      const collectionName = 'collection?';
      const collectionDescription = null;
      const collectionPrivate = true;

      const getCollectionQueryResult: GetCollectionQueryResult = GetCollectionQueryResult.new({
        id: collectionId,
        name: collectionName,
        description: collectionDescription,
        private: collectionPrivate,
      });

      expect(getCollectionQueryResult.id).toBe(collectionId);
    });
  });
});
