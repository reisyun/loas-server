import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { CreateLibraryPort } from '@core/domain/library/port/usecase/CreateLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';

export class CreateLibraryService implements CreateLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(libraryRepository: LibraryRepositoryPort, queryBus: QueryBusPort) {
    this.libraryRepository = libraryRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: CreateLibraryPort): Promise<LibraryUseCaseDto> {
    const { userId, name, description, private: isPrivate, isCustom } = payload;

    // 유저 아이디 조회
    const user: GetUserQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserQuery.new({ id: payload.userId })),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid user ID.',
      }),
    );

    const library: Library = await Library.new({
      userId: user.id,
      name,
      description,
      private: isPrivate,
      isCustom,
    });
    await this.libraryRepository.create(userId, library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
