import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CreateCollectionUseCase } from '@core/domain/collection/usecase/CreateCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * 컬렉션 생성 서비스
 *
 * 1. 데이터베이스에서 user 탐색, 없으면 error
 * 2. 입력받은 데이터를 통해 컬렉션 생성
 * 3. 생성한 컬렉션을 데이터베이스에 저장
 * 4. 컬렉션을 내보냄
 */
export class CreateCollectionService implements CreateCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(collectionRepository: CollectionRepositoryPort, queryBus: QueryBusPort) {
    this.collectionRepository = collectionRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: CreateCollectionPort): Promise<CollectionUseCaseDto> {
    const { userId, name, description, isCustom } = payload;

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

    const collection: Collection = await Collection.new({
      userId,
      name,
      description,
      isCustom,
    });
    await this.collectionRepository.create(collection);

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
