import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';

import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { AddCollectionItemPort } from '@core/domain/collection/port/usecase/AddCollectionItemPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { AddCollectionItemUseCase } from '@core/domain/collection/usecase/AddCollectionItemUseCase';
import { AddCollectionItemService } from '@core/service/collection/usecase/AddCollectionItemService';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

async function createCollection() {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'mock',
  });
}

describe('AddCollectionItemService', () => {
  let addCollectionItemService: AddCollectionItemUseCase;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.AddCollectionItemUseCase,
          useFactory: collectionRepository => new AddCollectionItemService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    addCollectionItemService = module.get<AddCollectionItemUseCase>(
      CollectionToken.AddCollectionItemUseCase,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('execute', () => {
    test('Expect it add collectionItem', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(mockCollection);
      jest.spyOn(collectionRepository, 'update').mockResolvedValue(undefined);

      jest.spyOn(collectionRepository, 'update').mockClear();

      const expectedCollectionUseCaseDto: CollectionUseCaseDto = await CollectionUseCaseDto.newFromCollection(
        mockCollection,
      );

      const addCollectionItemPort: AddCollectionItemPort = {
        collectionId: mockCollection.getId,
        mediaId: mockCollection.getCollector.getId,
      };

      const resultCollectionUseCaseDto: CollectionUseCaseDto = await addCollectionItemService.execute(
        addCollectionItemPort,
      );

      expect(resultCollectionUseCaseDto).not.toEqual(expectedCollectionUseCaseDto);
      expect(resultCollectionUseCaseDto.collectionItems).toHaveLength(1);
    });

    test('When collection not found, expect it throws Exception', async () => {
      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const addCollectionItemPort: AddCollectionItemPort = {
          collectionId: v4(),
          mediaId: v4(),
        };
        await addCollectionItemService.execute(addCollectionItemPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
