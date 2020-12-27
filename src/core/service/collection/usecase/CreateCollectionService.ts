import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { CreateCollectionUseCase } from '@core/domain/collection/usecase/CreateCollectionUseCase';

import { QueryBusPort } from '@core/common/message/port/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';

export class CreateCollectionService implements CreateCollectionUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(collectionRepository: CollectionRepositoryPort, queryBus: QueryBusPort) {
    this.collectionRepository = collectionRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: CreateCollectionPort): Promise<CollectionUseCaseDto> {
    const { collectorId, name, description, private: isPrivate } = payload;

    // user가 존재하는지 확인
    const collector: GetUserQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserQuery.new({ id: collectorId })),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid collector ID.',
      }),
    );

    const collection: Collection = await Collection.new({
      name,
      description,
      private: isPrivate,
      collector: await Collector.new(collector.id, collector.name),
    });
    await this.collectionRepository.create(collection);

    return CollectionUseCaseDto.newFromCollection(collection);
  }
}
