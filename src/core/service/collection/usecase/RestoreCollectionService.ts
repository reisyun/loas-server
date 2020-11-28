import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';
import { RestoreCollectionUseCase } from '@core/domain/collection/usecase/RestoreCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * 컬렉션 복구 서비스
 *
 * 1. 데이터베이스에서 collection 탐색, 없으면 error
 * 2. userID가 동일한지 확인, 틀리면 error
 * 3. 컬렉션을 복구
 * 4. 업데이트 된 컬렉션을 데이터베이스에 저장
 * 5. 컬렉션을 내보냄
 */
export class RestoreCollectionService implements RestoreCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: RestoreCollectionPort): Promise<CollectionUseCaseDto> {
    const { collectionId, collectorId } = payload;

    const collection: Collection = CoreAssert.notEmpty(
      await this.collectionRepository.findOne({ where: { id: collectionId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    const hasAccess: boolean = collectorId === collection.getCollectorId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await collection.restore();
    await this.collectionRepository.update(collection);

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
