import { v4 } from 'uuid';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'UserName'),
    name: 'Mock',
  });
}

describe('Collection', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates Collection instance with default parameters', async () => {
      const currentDate: number = Date.now();

      const collectorId: string = v4();
      const collectorName = 'UserName';

      const createCollectionEntityPayload: CreateCollectionEntityPayload = {
        collector: await Collector.new(collectorId, collectorName),
        name: 'Mock',
      };

      const collection: Collection = await Collection.new(createCollectionEntityPayload);

      const expectedCollector: Record<string, unknown> = {
        userId: collectorId,
        name: collectorName,
      };

      expect(collection.getName).toBe(createCollectionEntityPayload.name);
      expect(collection.getDescription).toBeNull();
      expect(collection.getCategory).toBe(Category.CUSTOM);
      expect(collection.getCollector).toEqual(expectedCollector);

      expect(typeof collection.getId === 'string').toBeTruthy();
      expect(collection.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getRemovedAt).toBeNull();
    });

    test('When input optional args are set, expect it creates Collection instance with mock parameters', async () => {
      const collectorId: string = v4();
      const collectorName = 'UserName';

      const mockId: string = v4();
      const mockDescription = 'test';
      const mockCreatedAt: Date = new Date(Date.now() - 3000);
      const mockUpdatedAt: Date = new Date(Date.now() - 2000);
      const mockRemovedAt: Date = new Date(Date.now() - 1000);

      const createCollectionEntityPayload: CreateCollectionEntityPayload = {
        collector: await Collector.new(collectorId, collectorName),
        name: 'Mock',
        id: mockId,
        description: mockDescription,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
        removedAt: mockRemovedAt,
      };

      const collection: Collection = await Collection.new(createCollectionEntityPayload);

      expect(collection.getId).toBe(mockId);
      expect(collection.getDescription).toBe(mockDescription);
      expect(collection.getCreatedAt).toBe(mockCreatedAt);
      expect(collection.getUpdatedAt).toBe(mockUpdatedAt);
      expect(collection.getRemovedAt).toBe(mockRemovedAt);
    });
  });

  describe('edit', () => {
    test("When input args are empty, expect it doesn't edit Collection instance", async () => {
      const createdDate: number = Date.now();

      const collectorId: string = v4();
      const collectorName = 'UserName';

      const collection = await Collection.new({
        collector: await Collector.new(collectorId, collectorName),
        name: 'Mock',
      });

      await collection.edit({});

      expect(collection.getName).toEqual('Mock');
      expect(collection.getDescription).toBeNull();
      expect(collection.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(createdDate - 5000);
    });

    test('When input args are set, expect it edits Collection instance', async () => {
      const currentDate: number = Date.now();

      const collection: Collection = await createCollection();

      await collection.edit({
        name: 'New collection name',
      });

      expect(collection.getName).toBe('New collection name');
      expect(collection.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });
  });

  describe('remove', () => {
    test('Expect it marks Collection instance as removed', async () => {
      const currentDate: number = Date.now();

      const collection: Collection = await createCollection();

      await collection.remove();

      expect(collection.getRemovedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('Expect it marks Collection instance removed is initialized', async () => {
      const collection: Collection = await createCollection();

      await collection.remove();
      await collection.restore();

      expect(collection.getRemovedAt).toBeNull();
    });
  });
});
