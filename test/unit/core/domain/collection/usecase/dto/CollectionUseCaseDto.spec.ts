import { v4 } from 'uuid';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

const mockCollectionData = (): CreateCollectionEntityPayload => ({
  collectorId: v4(),
  name: 'Mock collection',
  description: 'test collection',
  category: Category.CUSTOM,
});

async function createCollection(): Promise<Collection> {
  const createCollectionEntityPayload: CreateCollectionEntityPayload = mockCollectionData();
  return Collection.new(createCollectionEntityPayload);
}

describe('CollectionUseCaseDto', () => {
  describe('newFromCollection', () => {
    test('Expect it creates CollectionUseCaseDto instance with required parameters', async () => {
      const collection: Collection = await createCollection();
      const collectionUseCaseDto: CollectionUseCaseDto = CollectionUseCaseDto.newFromCollection(
        collection,
      );

      expect(collectionUseCaseDto.id).toBe(collection.getId);
      expect(collectionUseCaseDto.collectorId).toBe(collection.getCollectorId);
      expect(collectionUseCaseDto.name).toBe(collection.getName);
      expect(collectionUseCaseDto.category).toBe(collection.getCategory);
    });
  });

  describe('newListFromCollections', () => {
    test('Expect it creates CollectionUseCaseDto instances with required parameters', async () => {
      const collection: Collection = await createCollection();
      const collectionUseCaseDtos: CollectionUseCaseDto[] = CollectionUseCaseDto.newListFromCollections(
        [collection],
      );

      expect(collectionUseCaseDtos.length).toBe(1);
      expect(collectionUseCaseDtos[0].id).toBe(collection.getId);
      expect(collectionUseCaseDtos[0].collectorId).toBe(collection.getCollectorId);
      expect(collectionUseCaseDtos[0].name).toBe(collection.getName);
      expect(collectionUseCaseDtos[0].category).toBe(collection.getCategory);
    });
  });
});
