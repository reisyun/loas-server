import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { CreateLibraryPort } from '@core/domain/library/port/usecase/CreateLibraryPort';
import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

/**
 * 라이브러리 생성 서비스
 *
 * 1. 데이터베이스에서 user 탐색, 없으면 error
 * 2. 입력받은 데이터를 통해 라이브러리 생성
 * 3. 생성한 라이브러리를 데이터베이스에 저장
 * 4. 라이브러리를 내보냄
 */
export class CreateLibraryService implements CreateLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(libraryRepository: LibraryRepositoryPort, queryBus: QueryBusPort) {
    this.libraryRepository = libraryRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: CreateLibraryPort): Promise<LibraryUseCaseDto> {
    const { userId, name, description, private: isPrivate, isCustom } = payload;

    // 데이터베이스에서 user가 존재하는지 확인
    const doesUserExist: GetUserQueryResult = await this.queryBus.sendQuery(
      GetUserQuery.new({ id: userId }),
    );
    if (!doesUserExist) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid user ID.',
      });
    }

    const library: Library = await Library.new({
      userId,
      name,
      description,
      private: isPrivate,
      isCustom,
    });
    await this.libraryRepository.create(library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
