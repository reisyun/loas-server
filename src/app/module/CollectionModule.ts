import { Module, Provider } from '@nestjs/common';
import { GetCollectionService } from '@core/service/collection/usecase/GetCollectionService';
import { CreateCollectionService } from '@core/service/collection/usecase/CreateCollectionService';
import { EditCollectionService } from '@core/service/collection/usecase/EditCollectionService';
import { RemoveCollectionService } from '@core/service/collection/usecase/RemoveCollectionService';
import { RestoreCollectionService } from '@core/service/collection/usecase/RestoreCollectionService';
import { CoreToken } from '@app/token/CoreToken';
import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionResolver } from '@app/api/graphql/resolver/collection/CollectionResolver';
import { CollectionRepositoryAdapter } from '@infra/adapter/collection/persistence/CollectionRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: CollectionToken.CollectionRepository,
    useClass: CollectionRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CollectionToken.GetCollectionUseCase,
    useFactory: collectionRepository => new GetCollectionService(collectionRepository),
    inject: [CollectionToken.CollectionRepository],
  },
  {
    provide: CollectionToken.CreateCollectionUseCase,
    useFactory: (collectionRepository, queryBus) =>
      new CreateCollectionService(collectionRepository, queryBus),
    inject: [CollectionToken.CollectionRepository, CoreToken.QueryBus],
  },
  {
    provide: CollectionToken.EditCollectionUseCase,
    useFactory: collectionRepository => new EditCollectionService(collectionRepository),
    inject: [CollectionToken.CollectionRepository],
  },
  {
    provide: CollectionToken.RemoveCollectionUseCase,
    useFactory: collectionRepository => new RemoveCollectionService(collectionRepository),
    inject: [CollectionToken.CollectionRepository],
  },
  {
    provide: CollectionToken.RestoreCollectionUseCase,
    useFactory: collectionRepository => new RestoreCollectionService(collectionRepository),
    inject: [CollectionToken.CollectionRepository],
  },
];

@Module({
  providers: [CollectionResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [CollectionToken.CollectionRepository, CollectionToken.CreateCollectionUseCase],
})
export class CollectionModule {}
