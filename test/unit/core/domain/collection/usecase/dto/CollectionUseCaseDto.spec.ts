import { v4 } from 'uuid';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'UserName'),
    name: 'Mock',
  });
}

describe('CollectionUseCaseDto', () => {
  describe('newFromCollection', () => {
    test('Expect it creates CollectionUseCaseDto instance with required parameters', async () => {
      const collection: Collection = await createCollection();
      const collectionUseCaseDto: CollectionUseCaseDto = CollectionUseCaseDto.newFromCollection(
        collection,
      );

      const expectedCollector: Record<string, unknown> = {
        id: collection.getCollector.getId,
        name: collection.getCollector.getName,
      };

      expect(collectionUseCaseDto.id).toBe(collection.getId);
      expect(collectionUseCaseDto.name).toBe(collection.getName);
      expect(collectionUseCaseDto.category).toBe(collection.getCategory);
      expect(collectionUseCaseDto.collector).toEqual(expectedCollector);
    });
  });

  describe('newListFromCollections', () => {
    test('Expect it creates CollectionUseCaseDto instances with required parameters', async () => {
      const collection: Collection = await createCollection();
      const collectionUseCaseDtos: CollectionUseCaseDto[] = CollectionUseCaseDto.newListFromCollections(
        [collection],
      );

      const expectedCollector: Record<string, unknown> = {
        id: collection.getCollector.getId,
        name: collection.getCollector.getName,
      };

      expect(collectionUseCaseDtos.length).toBe(1);
      expect(collectionUseCaseDtos[0].id).toBe(collection.getId);
      expect(collectionUseCaseDtos[0].name).toBe(collection.getName);
      expect(collectionUseCaseDtos[0].category).toBe(collection.getCategory);
      expect(collectionUseCaseDtos[0].collector).toEqual(expectedCollector);
    });
  });
});
