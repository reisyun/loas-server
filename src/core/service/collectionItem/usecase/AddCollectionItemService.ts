import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { CollectionItem } from '@core/domain/collectionItem/entity/CollectionItem';
import { Collection } from '@core/domain/collectionItem/value-object/Collection';

import { CollectionItemRepositoryPort } from '@core/domain/collectionItem/port/persistence/CollectionItemRepositoryPort';
import { AddCollectionItemPort } from '@core/domain/collectionItem/port/usecase/AddCollectionItemPort';
import { CollectionItemUseCaseDto } from '@core/domain/collectionItem/usecase/dto/CollectionItemUseCaseDto';
import { AddCollectionItemUseCase } from '@core/domain/collectionItem/usecase/AddCollectionItemUseCase';

import { QueryBusPort } from '@core/common/message/port/QueryBusPort';
import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';

export class AddCollectionItemService implements AddCollectionItemUseCase {
  private readonly collectionItemRepository: CollectionItemRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(
    collectionItemRepository: CollectionItemRepositoryPort,
    queryBus: QueryBusPort,
  ) {
    this.collectionItemRepository = collectionItemRepository;
    this.queryBus = queryBus;
  }

  // TODO: 컬렉션 카테고리와 미디어 상태를 비교하여 규칙에 따라 추가하도록 만들기
  public async execute(payload: AddCollectionItemPort): Promise<CollectionItemUseCaseDto> {
    const { collectionId, private: isPrivate, completedAt, like, repeat } = payload;

    // collection이 존재하는지 확인
    const collection: GetCollectionQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetCollectionQuery.new({ id: collectionId })),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid collection ID.',
      }),
    );

    const collectionItem: CollectionItem = await CollectionItem.new({
      private: isPrivate,
      completedAt,
      like,
      repeat,
      collection: await Collection.new(collection.id, collection.category),
    });
    await this.collectionItemRepository.create(collectionItem);

    return CollectionItemUseCaseDto.newFromCollectionItem(collectionItem);
  }
}
