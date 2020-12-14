import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';

import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { EditCollectionPort } from '@core/domain/collection/port/usecase/EditCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { EditCollectionUseCase } from '@core/domain/collection/usecase/EditCollectionUseCase';
import { EditCollectionService } from '@core/service/collection/usecase/EditCollectionService';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

async function createCollection() {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'mock',
  });
}

describe('EditCollectionService', () => {
  let editCollectionService: EditCollectionUseCase;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.EditCollectionUseCase,
          useFactory: collectionRepository => new EditCollectionService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    editCollectionService = module.get<EditCollectionUseCase>(
      CollectionToken.EditCollectionUseCase,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('execute', () => {
    test('Expect it edit collection', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(mockCollection);
      jest.spyOn(collectionRepository, 'update').mockResolvedValue(undefined);

      jest.spyOn(collectionRepository, 'update').mockClear();

      const expectedCollectionUseCaseDto: CollectionUseCaseDto = await CollectionUseCaseDto.newFromCollection(
        mockCollection,
      );

      const editDescription = 'test collection';
      const editCollectionPort: EditCollectionPort = {
        collectionId: mockCollection.getId,
        collectorId: mockCollection.getCollector.getId,
        description: editDescription,
      };

      const resultCollectionUseCaseDto: CollectionUseCaseDto = await editCollectionService.execute(
        editCollectionPort,
      );

      expect(resultCollectionUseCaseDto).not.toEqual(expectedCollectionUseCaseDto);
      expect(resultCollectionUseCaseDto.description).toBe(editDescription);
    });

    test('When collection not found, expect it throws Exception', async () => {
      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const editCollectionPort: EditCollectionPort = { collectionId: v4(), collectorId: v4() };
        await editCollectionService.execute(editCollectionPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
