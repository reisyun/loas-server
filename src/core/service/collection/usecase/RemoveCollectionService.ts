import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { RemoveCollectionPort } from '@core/domain/collection/port/usecase/RemoveCollectionPort';
import { RemoveCollectionUseCase } from '@core/domain/collection/usecase/RemoveCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

export class RemoveCollectionService implements RemoveCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: RemoveCollectionPort): Promise<CollectionUseCaseDto> {
    const { collectionId, collectorId } = payload;

    const collection: Collection = CoreAssert.notEmpty(
      await this.collectionRepository.findOne({ where: { id: collectionId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    const hasAccess: boolean = collectorId === collection.getCollector.getId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // Soft delete
    await collection.remove();
    await this.collectionRepository.update(collection);

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
