import { v4 } from 'uuid';
import { Nullable } from '@core/common/Types';
import { Test, TestingModule } from '@nestjs/testing';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionsQueryHandler } from '@core/domain/collection/handler/GetCollectionsQueryHandler';
import { HandleGetCollectionsQueryService } from '@core/service/collection/handler/HandleGetCollectionsQueryService';
import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionRepositoryAdapter } from '@infra/adapter/collection/persistence/CollectionRepositoryAdapter';

async function createCollection() {
  return Collection.new({
    collector: await Collector.new(v4(), 'username'),
    name: 'Name',
  });
}

describe('HandleGetCollectionsQueryService', () => {
  let getCollectionQueryHandler: GetCollectionsQueryHandler;
  let collectionRepository: CollectionRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CollectionToken.GetCollectionsQueryHandler,
          useFactory: collectionRepository =>
            new HandleGetCollectionsQueryService(collectionRepository),
          inject: [CollectionToken.CollectionRepository],
        },
        {
          provide: CollectionToken.CollectionRepository,
          useClass: CollectionRepositoryAdapter,
        },
      ],
    }).compile();

    getCollectionQueryHandler = module.get<GetCollectionsQueryHandler>(
      CollectionToken.GetCollectionsQueryHandler,
    );
    collectionRepository = module.get<CollectionRepositoryPort>(
      CollectionToken.CollectionRepository,
    );
  });

  describe('handle', () => {
    test('When collection found, expect it return collection preview', async () => {
      const mockCollection: Collection = await createCollection();

      jest.spyOn(collectionRepository, 'findMany').mockResolvedValue([mockCollection]);

      const expected: GetCollectionsQueryResult[] = [
        GetCollectionsQueryResult.new({
          id: mockCollection.getId,
          category: mockCollection.getCategory,
        }),
      ];

      const getCollectionQuery: GetCollectionsQuery = GetCollectionsQuery.new({
        collectionId: mockCollection.getId,
      });
      const result: Nullable<GetCollectionsQueryResult[]> = await getCollectionQueryHandler.handle(
        getCollectionQuery,
      );

      expect(result).toEqual(expected);
    });

    test('When collection not found, expect it return null', async () => {
      jest.spyOn(collectionRepository, 'findMany').mockResolvedValue([]);

      const getCollectionQuery: GetCollectionsQuery = GetCollectionsQuery.new({
        collectionId: v4(),
      });
      const result: Nullable<GetCollectionsQueryResult[]> = await getCollectionQueryHandler.handle(
        getCollectionQuery,
      );

      expect(result).toBeNull();
    });
  });
});
