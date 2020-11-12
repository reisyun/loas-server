import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { CreateLibraryPort } from '@core/domain/library/port/usecase/CreateLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';

export class CreateLibraryService implements CreateLibraryUseCase {
  private readonly libraryRepository: LibraryRepositoryPort;

  public constructor(libraryRepository: LibraryRepositoryPort) {
    this.libraryRepository = libraryRepository;
  }

  public async execute(payload: CreateLibraryPort): Promise<LibraryUseCaseDto> {
    const { userId, name, description, private: isPrivate, isCustom } = payload;

    // TODO: CQRS 적용하기

    // 라이브러리 생성 규칙
    // - 한 라이브러리 안의 레코드는 중복 불가
    // - 사용자가 라이브러리를 추가할땐 무조건 커스텀 라이브러리여야 함

    const library: Library = await Library.new({
      userId,
      name,
      description,
      private: isPrivate,
      isCustom,
    });
    await this.libraryRepository.create(userId, library);

    return LibraryUseCaseDto.newFromLibrary(library);
  }
}
