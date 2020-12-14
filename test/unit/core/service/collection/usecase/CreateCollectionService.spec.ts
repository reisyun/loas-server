import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';

import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CreateCollectionUseCase } from '@core/domain/collection/usecase/CreateCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { CreateCollectionService } from '@core/service/collection/usecase/CreateCollectionService';

import { CoreToken } from '@app/token/CoreToken';
import { CollectionToken } from '@app/token/CollectionToken';

import { NestQueryBusAdapter } from '@infra/adapter/common/message/NestQueryBusAdapter';
import { CollectionRepositoryAdapter } from '@infra/adapter/collection/persistence/CollectionRepositoryAdapter';

function createCollector(): GetUserQueryResult {
  const id: string = v4();
  const name = 'collectionname';

  return GetUserQueryResult.new({ id, name });
}

describe('CreateCollectionService', () => {
  let createCollectionService: CreateCollectionUseCase;
  let collectionRepository: CollectionRepositoryPort;
  let queryBus: QueryBusPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: CollectionToken.CreateCollectionUseCase,
          useFactory: (collectionRepository, queryBus) =>
            new CreateCollectionService(collectionRepository, queryBus),
          inject: [CollectionToken.CollectionRepository, CoreToken.QueryBus],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
        {
          provide: CoreToken.QueryBus,
          useClass: NestQueryBusAdapter,
        },
      ],
    }).compile();

    createCollectionService = module.get<CreateCollectionUseCase>(
      CollectionToken.CreateCollectionUseCase,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
    queryBus = module.get<QueryBusPort>(CoreToken.QueryBus);
  });

  describe('execute', () => {
    test('Expect it create collection', async () => {
      const mockCollector: GetUserQueryResult = createCollector();

      const createCollectionPort: CreateCollectionPort = {
        collectorId: mockCollector.id,
        name: 'mock',
      };

      const mockCollection: Collection = await Collection.new({
        collector: await Collector.new(mockCollector.id, mockCollector.name),
        name: createCollectionPort.name,
      });

      jest.spyOn(queryBus, 'sendQuery').mockResolvedValue(mockCollector);
      jest.spyOn(collectionRepository, 'create').mockResolvedValue(undefined);

      jest.spyOn(collectionRepository, 'create').mockClear();

      const expectedCollectionUseCaseDto: CollectionUseCaseDto = await CollectionUseCaseDto.newFromCollection(
        mockCollection,
      );

      const resultCollectionUseCaseDto: CollectionUseCaseDto = await createCollectionService.execute(
        createCollectionPort,
      );
      Reflect.set(resultCollectionUseCaseDto, 'id', expectedCollectionUseCaseDto.id);

      expect(resultCollectionUseCaseDto).toEqual(expectedCollectionUseCaseDto);
    });

    test('When collector not found, expect it throws Exception', async () => {
      jest.spyOn(queryBus, 'sendQuery').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const mockCollector: GetUserQueryResult = createCollector();

        const createCollectionPort: CreateCollectionPort = {
          collectorId: mockCollector.id,
          name: 'mock',
        };
        await createCollectionService.execute(createCollectionPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
