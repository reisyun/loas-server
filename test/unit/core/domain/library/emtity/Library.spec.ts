import { v4 } from 'uuid';
import { Library } from '@core/domain/library/entity/Library';
import { CreateLibraryEntityPayload } from '@core/domain/library/entity/type/CreateLibraryEntityPayload';

const mockLibraryData = (): CreateLibraryEntityPayload => ({
  userId: v4(),
  name: 'Mock library',
  description: 'test library',
  private: true,
  isCustom: false,
});

describe('Library', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates Library instance with default parameters', async () => {
      const createLibraryEntityPayload: CreateLibraryEntityPayload = mockLibraryData();
      const currentDate: number = Date.now();

      const library: Library = await Library.new(createLibraryEntityPayload);

      expect(library.getName).toBe(createLibraryEntityPayload.name);
      expect(library.getDescription).toBe(createLibraryEntityPayload.description);
      expect(library.getPrivate).toBe(createLibraryEntityPayload.private);
      expect(library.getIsCustom).toBe(createLibraryEntityPayload.isCustom);

      expect(typeof library.getId === 'string').toBeTruthy();
      expect(typeof library.getUserId === 'string').toBeTruthy();
      expect(library.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(library.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(library.getRemovedAt).toBeNull();
    });

    test('When input optional args are set, expect it creates Library instance with mock parameters', async () => {
      const createLibraryEntityPayload: CreateLibraryEntityPayload = mockLibraryData();
      const mockId: string = v4();
      const mockUserId: string = v4();
      const mockCreatedAt: Date = new Date(Date.now() - 3000);
      const mockUpdatedAt: Date = new Date(Date.now() - 2000);
      const mockRemovedAt: Date = new Date(Date.now() - 1000);

      const library: Library = await Library.new({
        ...createLibraryEntityPayload,
        id: mockId,
        userId: mockUserId,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
        removedAt: mockRemovedAt,
      });

      expect(library.getName).toBe(createLibraryEntityPayload.name);
      expect(library.getDescription).toBe(createLibraryEntityPayload.description);
      expect(library.getPrivate).toBe(createLibraryEntityPayload.private);
      expect(library.getIsCustom).toBe(createLibraryEntityPayload.isCustom);

      expect(library.getId).toBe(mockId);
      expect(library.getUserId).toBe(mockUserId);
      expect(library.getCreatedAt).toBe(mockCreatedAt);
      expect(library.getUpdatedAt).toBe(mockUpdatedAt);
      expect(library.getRemovedAt).toBe(mockRemovedAt);
    });
  });

  describe('remove', () => {
    test('Expect it marks Library instance as removed', async () => {
      const createLibraryEntityPayload: CreateLibraryEntityPayload = mockLibraryData();
      const currentDate: number = Date.now();

      const library: Library = await Library.new(createLibraryEntityPayload);

      await library.remove();

      expect(library.getRemovedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('Expect it marks Library instance removed is initialized', async () => {
      const createLibraryEntityPayload: CreateLibraryEntityPayload = mockLibraryData();

      const library: Library = await Library.new(createLibraryEntityPayload);

      await library.remove();
      await library.restore();

      expect(library.getRemovedAt).toBeNull();
    });
  });
});
