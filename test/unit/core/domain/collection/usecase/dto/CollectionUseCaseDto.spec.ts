import { v4 } from 'uuid';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CollectionItem } from '@core/domain/collection/value-object/CollectionItem';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'UserName'),
    name: 'Mock',
    collectionItems: [await CollectionItem.new({ mediaId: v4() })],
  });
}

describe('CollectionUseCaseDto', () => {
  let collection: Collection;
  let expectedCollector: Record<string, unknown>;
  let expectedCollectionItems: Record<string, unknown>[];

  beforeEach(async () => {
    collection = await createCollection();

    expectedCollector = {
      id: collection.getCollector.getId,
      name: collection.getCollector.getName,
    };
    expectedCollectionItems = collection.getCollectionItems.map(collectionItem => ({
      mediaId: collectionItem.getMediaId,
      updatedAt: collectionItem.getUpdatedAt,
    }));
  });

  describe('newFromCollection', () => {
    test('Expect it creates CollectionUseCaseDto instance with required parameters', async () => {
      const collectionUseCaseDto: CollectionUseCaseDto = CollectionUseCaseDto.newFromCollection(
        collection,
      );

      expect(collectionUseCaseDto.id).toBe(collection.getId);
      expect(collectionUseCaseDto.name).toBe(collection.getName);
      expect(collectionUseCaseDto.collector).toEqual(expectedCollector);
      expect(collectionUseCaseDto.collectionItems).toEqual(expectedCollectionItems);
    });
  });

  describe('newListFromCollections', () => {
    test('Expect it creates CollectionUseCaseDto instances with required parameters', async () => {
      const collectionUseCaseDtos: CollectionUseCaseDto[] = CollectionUseCaseDto.newListFromCollections(
        [collection],
      );

      expect(collectionUseCaseDtos.length).toBe(1);
      expect(collectionUseCaseDtos[0].id).toBe(collection.getId);
      expect(collectionUseCaseDtos[0].name).toBe(collection.getName);
      expect(collectionUseCaseDtos[0].collector).toEqual(expectedCollector);
      expect(collectionUseCaseDtos[0].collectionItems).toEqual(expectedCollectionItems);
    });
  });
});
