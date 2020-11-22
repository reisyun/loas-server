import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { GetLibraryPort } from '@core/domain/library/port/usecase/GetLibraryPort';
import { GetLibraryUseCase } from '@core/domain/library/usecase/GetLibraryUseCase';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

export class GetLibraryService implements GetLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  public constructor(libraryRepository: LibraryRepositoryPort) {
    this.libraryRepository = libraryRepository;
  }

  public async execute(payload: GetLibraryPort): Promise<LibraryUseCaseDto[]> {
    const { libraryId, userId } = payload;

    const libraries: Library[] = CoreAssert.notEmpty(
      await this.libraryRepository.findMany({
        where: {
          id: libraryId,
          userId,

          // Filter removed records
          removedAt: null,
          user: { removedAt: null },
        },
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Library not found.',
      }),
    );

    return LibraryUseCaseDto.newListFromLibraries(libraries);
  }
}
