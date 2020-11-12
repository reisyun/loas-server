import { v4 } from 'uuid';
import { Library } from '@core/domain/library/entity/Library';
import { CreateLibraryEntityPayload } from '@core/domain/library/entity/type/CreateLibraryEntityPayload';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

const mockLibraryData = (): CreateLibraryEntityPayload => ({
  userId: v4(),
  name: 'Mock library',
  description: 'test library',
  private: false,
  isCustom: false,
});

async function createLibrary(): Promise<Library> {
  const createLibraryEntityPayload: CreateLibraryEntityPayload = mockLibraryData();
  return Library.new(createLibraryEntityPayload);
}

describe('LibraryUseCaseDto', () => {
  describe('newFromLibrary', () => {
    test('Expect it creates LibraryUseCaseDto instance with required parameters', async () => {
      const library: Library = await createLibrary();
      const libraryUseCaseDto: LibraryUseCaseDto = LibraryUseCaseDto.newFromLibrary(library);

      expect(libraryUseCaseDto.id).toBe(library.getId);
      expect(libraryUseCaseDto.userId).toBe(library.getUserId);
      expect(libraryUseCaseDto.name).toBe(library.getName);
      expect(libraryUseCaseDto.private).toBe(library.getPrivate);
      expect(libraryUseCaseDto.isCustom).toBe(library.getIsCustom);
    });
  });

  describe('newListFromLibrarys', () => {
    test('Expect it creates LibraryUseCaseDto instances with required parameters', async () => {
      const library: Library = await createLibrary();
      const libraryUseCaseDtos: LibraryUseCaseDto[] = LibraryUseCaseDto.newListFromLibraries([
        library,
      ]);

      expect(libraryUseCaseDtos.length).toBe(1);
      expect(libraryUseCaseDtos[0].id).toBe(library.getId);
      expect(libraryUseCaseDtos[0].userId).toBe(library.getUserId);
      expect(libraryUseCaseDtos[0].name).toBe(library.getName);
      expect(libraryUseCaseDtos[0].private).toBe(library.getPrivate);
      expect(libraryUseCaseDtos[0].isCustom).toBe(library.getIsCustom);
    });
  });
});
