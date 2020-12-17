import { Module, Provider } from '@nestjs/common';

import { AddCollectionItemService } from '@core/service/collectionItem/usecase/AddCollectionItemService';

import { CoreToken } from '@app/token/CoreToken';
import { CollectionItemToken } from '@app/token/CollectionItemToken';
import { CollectionItemResolver } from '@app/api/graphql/resolver/collectionItem/CollectionItemResolver';
import { CollectionItemRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionItemRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: CollectionItemToken.CollectionItemRepository,
    useClass: CollectionItemRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CollectionItemToken.AddCollectionItemUseCase,
    useFactory: (collectionRepository, queryBus) =>
      new AddCollectionItemService(collectionRepository, queryBus),
    inject: [CollectionItemToken.CollectionItemRepository, CoreToken.QueryBus],
  },
];

@Module({
  providers: [CollectionItemResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [CollectionItemToken.CollectionItemRepository],
})
export class CollectionItemModule {}
