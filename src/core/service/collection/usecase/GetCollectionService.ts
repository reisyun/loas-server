import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { GetCollectionUseCase } from '@core/domain/collection/usecase/GetCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

export class GetCollectionService implements GetCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: GetCollectionPort): Promise<CollectionUseCaseDto[]> {
    const { collectionId, collectorId } = payload;

    const collections: Collection[] = CoreAssert.notEmpty(
      await this.collectionRepository.findMany({
        where: {
          id: collectionId,
          collectorId,

          // Filter removed records
          removedAt: null,
          deletedCollector: null,
        },
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    return CollectionUseCaseDto.newListFromCollections(collections);
  }
}
