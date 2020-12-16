import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionListPort } from '@core/domain/collection/port/usecase/GetCollectionListPort';
import { GetCollectionListUseCase } from '@core/domain/collection/usecase/GetCollectionListUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { GetCollectionListService } from '@core/service/collection/usecase/GetCollectionListService';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'mock',
  });
}

describe('GetCollectionListService', () => {
  let getCollectionService: GetCollectionListUseCase;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.GetCollectionListUseCase,
          useFactory: collectionRepository => new GetCollectionListService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    getCollectionService = module.get<GetCollectionListUseCase>(
      CollectionToken.GetCollectionListUseCase,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('execute', () => {
    test('Expect it return collection list', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findMany').mockResolvedValue([mockCollection]);

      const expectedCollectionUseCaseDto: CollectionUseCaseDto = await CollectionUseCaseDto.newFromCollection(
        mockCollection,
      );

      const getCollectionPort: GetCollectionListPort = {
        collectorId: mockCollection.getCollector.getId,
      };
      const resultCollectionUseCaseDtos: CollectionUseCaseDto[] = await getCollectionService.execute(
        getCollectionPort,
      );

      expect(resultCollectionUseCaseDtos[0]).toEqual(expectedCollectionUseCaseDto);
    });
  });
});
