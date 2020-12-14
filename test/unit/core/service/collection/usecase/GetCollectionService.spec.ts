import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';

import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { GetCollectionUseCase } from '@core/domain/collection/usecase/GetCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { GetCollectionService } from '@core/service/collection/usecase/GetCollectionService';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'mock',
  });
}

describe('GetCollectionService', () => {
  let getCollectionService: GetCollectionUseCase;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.GetCollectionUseCase,
          useFactory: collectionRepository => new GetCollectionService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    getCollectionService = module.get<GetCollectionUseCase>(CollectionToken.GetCollectionUseCase);
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('execute', () => {
    test('Expect it return collection', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findMany').mockResolvedValue([mockCollection]);

      const expectedCollectionUseCaseDto: CollectionUseCaseDto[] = await CollectionUseCaseDto.newListFromCollections(
        [mockCollection],
      );

      const getCollectionPort: GetCollectionPort = { collectionId: mockCollection.getId };
      const resultCollectionUseCaseDto: CollectionUseCaseDto[] = await getCollectionService.execute(
        getCollectionPort,
      );

      expect(resultCollectionUseCaseDto).toEqual(expectedCollectionUseCaseDto);
    });

    test('When collection not found, expect it throws Exception', async () => {
      jest.spyOn(collectionRepository, 'findMany').mockResolvedValue([]);

      expect.hasAssertions();

      try {
        const getCollectionPort: GetCollectionPort = { collectionId: v4() };
        await getCollectionService.execute(getCollectionPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
