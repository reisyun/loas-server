import { v4 } from 'uuid';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';

const mockCollectionData = (): CreateCollectionEntityPayload => ({
  userId: v4(),
  name: 'Mock collection',
  description: 'test collection',
  isCustom: false,
});

describe('Collection', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates Collection instance with default parameters', async () => {
      const createCollectionEntityPayload: CreateCollectionEntityPayload = mockCollectionData();
      const currentDate: number = Date.now();

      const collection: Collection = await Collection.new(createCollectionEntityPayload);

      expect(collection.getName).toBe(createCollectionEntityPayload.name);
      expect(collection.getDescription).toBe(createCollectionEntityPayload.description);
      expect(collection.getIsCustom).toBe(createCollectionEntityPayload.isCustom);

      expect(typeof collection.getId === 'string').toBeTruthy();
      expect(typeof collection.getUserId === 'string').toBeTruthy();
      expect(collection.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(collection.getRemovedAt).toBeNull();
    });

    test('When input optional args are set, expect it creates Collection instance with mock parameters', async () => {
      const createCollectionEntityPayload: CreateCollectionEntityPayload = mockCollectionData();
      const mockId: string = v4();
      const mockUserId: string = v4();
      const mockCreatedAt: Date = new Date(Date.now() - 3000);
      const mockUpdatedAt: Date = new Date(Date.now() - 2000);
      const mockRemovedAt: Date = new Date(Date.now() - 1000);

      const collection: Collection = await Collection.new({
        ...createCollectionEntityPayload,
        id: mockId,
        userId: mockUserId,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
        removedAt: mockRemovedAt,
      });

      expect(collection.getName).toBe(createCollectionEntityPayload.name);
      expect(collection.getDescription).toBe(createCollectionEntityPayload.description);
      expect(collection.getIsCustom).toBe(createCollectionEntityPayload.isCustom);

      expect(collection.getId).toBe(mockId);
      expect(collection.getUserId).toBe(mockUserId);
      expect(collection.getCreatedAt).toBe(mockCreatedAt);
      expect(collection.getUpdatedAt).toBe(mockUpdatedAt);
      expect(collection.getRemovedAt).toBe(mockRemovedAt);
    });
  });

  describe('remove', () => {
    test('Expect it marks Collection instance as removed', async () => {
      const createCollectionEntityPayload: CreateCollectionEntityPayload = mockCollectionData();
      const currentDate: number = Date.now();

      const collection: Collection = await Collection.new(createCollectionEntityPayload);

      await collection.remove();

      expect(collection.getRemovedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('Expect it marks Collection instance removed is initialized', async () => {
      const createCollectionEntityPayload: CreateCollectionEntityPayload = mockCollectionData();

      const collection: Collection = await Collection.new(createCollectionEntityPayload);

      await collection.remove();
      await collection.restore();

      expect(collection.getRemovedAt).toBeNull();
    });
  });
});
