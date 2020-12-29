import { v4 } from 'uuid';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CollectionItem } from '@core/domain/collection/value-object/CollectionItem';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';

async function createCollector(): Promise<Collector> {
  const collector = await Collector.new(v4(), 'UserName');
  return collector;
}

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await createCollector(),
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
      expect(collection.getCollector).toEqual(expectedCollector);
      expect(collection.getCollectionItems).toHaveLength(0);

      expect(typeof collection.getId === 'string').toBeTruthy();
      expect(collection.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getRemovedAt).toBeNull();
    });

    test('When input optional args are set, expect it creates Collection instance with mock parameters', async () => {
      const mockId: string = v4();
      const mockDescription = 'test';
      const mockCreatedAt: Date = new Date(Date.now() - 3000);
      const mockUpdatedAt: Date = new Date(Date.now() - 2000);
      const mockRemovedAt: Date = new Date(Date.now() - 1000);

      const createCollectionEntityPayload: CreateCollectionEntityPayload = {
        collector: await createCollector(),
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
      const collection = await Collection.new({
        collector: await createCollector(),
        name: 'Mock',
      });

      await collection.edit({});

      expect(collection.getName).toEqual('Mock');
      expect(collection.getDescription).toBeNull();
    });

    test('When input args are set, expect it edits Collection instance', async () => {
      const collection: Collection = await createCollection();

      await collection.edit({
        name: 'New collection name',
      });

      expect(collection.getName).toBe('New collection name');
      expect(collection.getDescription).toBeNull();
    });
  });

  describe('remove', () => {
    test('Expect it marks Collection instance as removed', async () => {
      const currentDate: number = Date.now();

      const collection: Collection = await createCollection();
      await collection.remove();

      expect(collection.getRemovedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('Expect Collection instance as recovered', async () => {
      const collection: Collection = await createCollection();
      await collection.remove();
      await collection.restore();

      expect(collection.getRemovedAt).toBeNull();
    });
  });

  describe('addCollectionItem', () => {
    test('When Media not exists in collectionItems, expect it added', async () => {
      const collection: Collection = await createCollection();

      const collectionItem1 = await CollectionItem.new({ mediaId: v4() });
      const collectionItem2 = await CollectionItem.new({ mediaId: v4() });

      await collection.addCollectionItem(collectionItem1);
      await collection.addCollectionItem(collectionItem2);

      expect(collection.getCollectionItems[0]).toBe(collectionItem1);
      expect(collection.getCollectionItems[1]).toBe(collectionItem2);
    });

    test('When Media already exists in collectionItems, expect it not added', async () => {
      const collection: Collection = await createCollection();

      const collectionItem = await CollectionItem.new({ mediaId: v4() });

      await collection.addCollectionItem(collectionItem);
      await collection.addCollectionItem(collectionItem);

      expect(collection.getCollectionItems[0]).toBe(collectionItem);
      expect(collection.getCollectionItems[1]).toBeUndefined();
    });
  });

  describe('sortCollectionItemListByDate', () => {
    test.only('Expect to be sorted by latest date', async () => {
      const collection: Collection = await createCollection();

      const collectionItem1 = await CollectionItem.new({ mediaId: v4() });
      const collectionItem2 = await CollectionItem.new({ mediaId: v4() });

      await collection.addCollectionItem(collectionItem1);
      await collection.addCollectionItem(collectionItem2);

      await collection.sortCollectionItemListByDate('LATEST');

      expect(collection.getCollectionItems[0]).toBe(collectionItem2);
    });
  });
});
