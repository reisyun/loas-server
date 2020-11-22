import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { RemoveLibraryPort } from '@core/domain/library/port/usecase/RemoveLibraryPort';
import { RemoveLibraryUseCase } from '@core/domain/library/usecase/RemoveLibraryUseCase';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

/**
 * 라이브러리 삭제 서비스
 *
 * 1. 데이터베이스에서 library 탐색, 없으면 error
 * 2. userID가 동일한지 확인, 틀리면 error
 * 3. 라이브러리를 소프트 삭제
 * 4. 업데이트 된 라이브러리를 데이터베이스에 저장
 * 5. 라이브러리를 내보냄
 */
export class RemoveLibraryService implements RemoveLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  constructor(libraryRepository: LibraryRepositoryPort) {
    this.libraryRepository = libraryRepository;
  }

  public async execute(payload: RemoveLibraryPort): Promise<LibraryUseCaseDto> {
    const { libraryId, userId } = payload;

    const library: Library = CoreAssert.notEmpty(
      await this.libraryRepository.findOne({ id: libraryId }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Library not found.',
      }),
    );

    const hasAccess: boolean = userId === library.getUserId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // Soft delete
    await library.remove();
    await this.libraryRepository.update(library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
