import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { EditLibraryPort } from '@core/domain/library/port/usecase/EditLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { EditLibraryUseCase } from '@core/domain/library/usecase/EditLibraryUseCase';

/**
 * 라이브러리 수정 서비스
 *
 * 1. 데이터베이스에서 library 탐색, 없으면 error
 * 2. 데이터베이스에서 user 탐색, 없으면 null
 * 3. 각각 찾은 userID가 동일한지 확인, 틀리면 error
 * 4. 입력받은 데이터를 통해 라이브러리 수정
 * 5. 라이브러리를 데이터베이스에 저장
 * 6. 라이브러리를 내보냄
 */
export class EditLibraryService implements EditLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(libraryRepository: LibraryRepositoryPort, queryBus: QueryBusPort) {
    this.libraryRepository = libraryRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: EditLibraryPort): Promise<LibraryUseCaseDto> {
    const { libraryId, userId, name, description, private: isPrivate } = payload;

    const library: Library = CoreAssert.notEmpty(
      await this.libraryRepository.findOne({ id: libraryId }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Library not found.',
      }),
    );

    const user: GetUserQueryResult = await this.queryBus.sendQuery(
      GetUserQuery.new({ id: userId }),
    );

    const hasAccess: boolean = user.id === library.getUserId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await library.edit({ name, description, private: isPrivate });
    await this.libraryRepository.update(library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
