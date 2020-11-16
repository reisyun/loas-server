import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { GetLibraryPort } from '@core/domain/library/port/usecase/GetLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { GetLibraryUseCase } from '@core/domain/library/usecase/GetLibraryUseCase';

export class GetLibraryService implements GetLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  public constructor(libraryRepository: LibraryRepositoryPort) {
    this.libraryRepository = libraryRepository;
  }

  public async execute(payload: GetLibraryPort): Promise<LibraryUseCaseDto> {
    const { libraryId, userId } = payload;

    const library: Library = CoreAssert.notEmpty(
      await this.libraryRepository.findOne({ id: libraryId, userId }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Library not found.',
      }),
    );

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
