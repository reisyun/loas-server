import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { Collection } from '@core/domain/collection/entity/Collection';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { DeleteCollectionItemPort } from '@core/domain/collection/port/usecase/DeleteCollectionItemPort';
import { DeleteCollectionItemUseCase } from '@core/domain/collection/usecase/DeleteCollectionItemUseCase';

export class DeleteCollectionItemService implements DeleteCollectionItemUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: DeleteCollectionItemPort): Promise<void> {
    const { executorId, collectionId, mediaId } = payload;

    const collection: Collection = CoreAssert.notEmpty(
      await this.collectionRepository.findOne({ where: { id: collectionId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    const hasAccess: boolean = executorId === collection.getCollector.getId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    const doesCollectionItemExist: boolean = collection.getCollectionItems.some(collectionItem =>
      collectionItem.verifySameMediaExist(mediaId),
    );
    CoreAssert.isTrue(
      doesCollectionItemExist,
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'CollectionItem not found.',
      }),
    );

    await this.collectionRepository.deleteCollectionItem(collectionId, mediaId);
  }
}
