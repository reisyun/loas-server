import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { Collection, Category } from '@core/domain/collection/entity/Collection';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { GetCollectionUseCase } from '@core/domain/collection/usecase/GetCollectionUseCase';

export class GetCollectionService implements GetCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: GetCollectionPort): Promise<CollectionUseCaseDto> {
    const { executorId, collectionId } = payload;

    const collection: Collection = CoreAssert.notEmpty(
      await this.collectionRepository.findOne({ where: { id: collectionId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    // 컬렉션의 소유자가 아니라면 카테고리가 CUSTOM인 것만 조회 가능
    const hasAccess: boolean =
      executorId === collection.getCollector.getId || collection.getCategory === Category.CUSTOM;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
