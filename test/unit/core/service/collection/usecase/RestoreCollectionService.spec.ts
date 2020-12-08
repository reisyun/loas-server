import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';
import { RestoreCollectionUseCase } from '@core/domain/collection/usecase/RestoreCollectionUseCase';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { RestoreCollectionService } from '@core/service/collection/usecase/RestoreCollectionService';
import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/collection/persistence/CollectionRepositoryAdapter';

async function createCollection(): Promise<Collection> {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'mock',
  });
}

describe('RestoreCollectionService', () => {
  let restoreCollectionService: RestoreCollectionUseCase;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.RestoreCollectionUseCase,
          useFactory: collectionRepository => new RestoreCollectionService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    restoreCollectionService = module.get<RestoreCollectionUseCase>(
      CollectionToken.RestoreCollectionUseCase,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('execute', () => {
    test('Expect it return collection', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(mockCollection);
      jest.spyOn(collectionRepository, 'update').mockResolvedValue(undefined);

      jest.spyOn(collectionRepository, 'update').mockClear();

      const expectedCollectionUseCaseDto: CollectionUseCaseDto = await CollectionUseCaseDto.newFromCollection(
        mockCollection,
      );

      const restoreCollectionPort: RestoreCollectionPort = {
        collectionId: mockCollection.getId,
        collectorId: mockCollection.getCollector.getId,
      };

      const resultCollectionUseCaseDto: CollectionUseCaseDto = await restoreCollectionService.execute(
        restoreCollectionPort,
      );

      expect(resultCollectionUseCaseDto).toEqual({
        ...expectedCollectionUseCaseDto,
        removedAt: null,
      });
    });

    test('When collection not found, expect it throws Exception', async () => {
      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const restoreCollectionPort: RestoreCollectionPort = {
          collectionId: v4(),
          collectorId: v4(),
        };
        await restoreCollectionService.execute(restoreCollectionPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });

    test('When collector not matched, expect it throws Exception', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(mockCollection);

      expect.hasAssertions();

      try {
        const restoreCollectionPort: RestoreCollectionPort = {
          collectionId: mockCollection.getId,
          collectorId: v4(),
        };
        await restoreCollectionService.execute(restoreCollectionPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ACCESS_DENIED_ERROR.code);
      }
    });
  });
});
