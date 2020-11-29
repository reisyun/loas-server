import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';
import { RestoreCollectionUseCase } from '@core/domain/collection/usecase/RestoreCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

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
