import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionItem } from '@core/domain/collection/entity/CollectionItem';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { AddCollectionItemPort } from '@core/domain/collection/port/usecase/AddCollectionItemPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { AddCollectionItemUseCase } from '@core/domain/collection/usecase/AddCollectionItemUseCase';

export class AddCollectionItemService implements AddCollectionItemUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  // TODO: 쿼리를 통해 미디어를 검증 후 추가하도록 만들기
  public async execute(payload: AddCollectionItemPort): Promise<CollectionUseCaseDto> {
    const { collectionId, mediaId } = payload;

    const collection: Collection = CoreAssert.notEmpty(
      await this.collectionRepository.findOne({ where: { id: collectionId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Collection not found.',
      }),
    );

    await collection.addCollectionItem(await CollectionItem.new({ mediaId }));
    await this.collectionRepository.update(collection);

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
