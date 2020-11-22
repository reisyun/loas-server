import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { EditLibraryPort } from '@core/domain/library/port/usecase/EditLibraryPort';
import { EditLibraryUseCase } from '@core/domain/library/usecase/EditLibraryUseCase';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

/**
 * 라이브러리 수정 서비스
 *
 * 1. 데이터베이스에서 library 탐색, 없으면 error
 * 2. userID가 동일한지 확인, 틀리면 error
 * 3. 입력받은 데이터를 통해 라이브러리 수정
 * 4. 업데이트 된 라이브러리를 데이터베이스에 저장
 * 5. 라이브러리를 내보냄
 */
export class EditLibraryService implements EditLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  public constructor(libraryRepository: LibraryRepositoryPort) {
    this.libraryRepository = libraryRepository;
  }

  public async execute(payload: EditLibraryPort): Promise<LibraryUseCaseDto> {
    const { libraryId, userId, name, description, private: isPrivate } = payload;

    const library: Library = CoreAssert.notEmpty(
      await this.libraryRepository.findOne({ where: { id: libraryId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Library not found.',
      }),
    );

    const hasAccess: boolean = userId === library.getUserId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await library.edit({ name, description, private: isPrivate });
    await this.libraryRepository.update(library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
