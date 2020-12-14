import { v4 } from 'uuid';
import { Nullable } from '@core/common/Types';
import { Test, TestingModule } from '@nestjs/testing';

import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';

import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';
import { GetCollectionQueryHandler } from '@core/domain/collection/handler/GetCollectionQueryHandler';
import { HandleGetCollectionQueryService } from '@core/service/collection/handler/HandleGetCollectionQueryService';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

async function createCollection() {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'Name',
  });
}

describe('HandleGetCollectionQueryService', () => {
  let getCollectionQueryHandler: GetCollectionQueryHandler;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.GetCollectionQueryHandler,
          useFactory: collectionRepository =>
            new HandleGetCollectionQueryService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    getCollectionQueryHandler = module.get<GetCollectionQueryHandler>(
      CollectionToken.GetCollectionQueryHandler,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('handle', () => {
    test('When collection found, expect it return collection preview', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(mockCollection);

      const expected: GetCollectionQueryResult = GetCollectionQueryResult.new({
        id: mockCollection.getId,
        category: mockCollection.getCategory,
      });

      const getCollectionQuery: GetCollectionQuery = GetCollectionQuery.new({
        id: mockCollection.getId,
      });
      const result: Nullable<GetCollectionQueryResult> = await getCollectionQueryHandler.handle(
        getCollectionQuery,
      );

      expect(result).toEqual(expected);
    });

    test('When collection not found, expect it return null', async () => {
      jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(null);

      const getCollectionQuery: GetCollectionQuery = GetCollectionQuery.new({ id: v4() });
      const result: Nullable<GetCollectionQueryResult> = await getCollectionQueryHandler.handle(
        getCollectionQuery,
      );

      expect(result).toBeNull();
    });
  });
});
