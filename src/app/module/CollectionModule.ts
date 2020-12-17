import { Module, Provider } from '@nestjs/common';

import { GetCollectionService } from '@core/service/collection/usecase/GetCollectionService';
import { GetCollectionListService } from '@core/service/collection/usecase/GetCollectionListService';
import { CreateCollectionService } from '@core/service/collection/usecase/CreateCollectionService';
import { EditCollectionService } from '@core/service/collection/usecase/EditCollectionService';
import { RemoveCollectionService } from '@core/service/collection/usecase/RemoveCollectionService';
import { RestoreCollectionService } from '@core/service/collection/usecase/RestoreCollectionService';

import { CoreToken } from '@app/token/CoreToken';
import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionResolver } from '@app/api/graphql/resolver/collection/CollectionResolver';
import { CollectionRepositoryAdapter } from '@infra/adapter/persistence/repository/CollectionRepositoryAdapter';

import { HandleGetCollectionQueryService } from '@core/service/collection/handler/HandleGetCollectionQueryService';
import { NestGetCollectionQueryHandler } from '@infra/handler/collection/NestGetCollectionQueryHandler';

import { HandleCollectionRegisteredEventService } from '@core/service/collection/handler/HandleCollectionRegisteredEventService';
import { NestCollectionRegisteredEventHandler } from '@infra/handler/collection/NestCollectionRegisteredEventHandler';

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
    provide: CollectionToken.GetCollectionListUseCase,
    useFactory: collectionRepository => new GetCollectionListService(collectionRepository),
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

const handlerProviders: Provider[] = [
  NestGetCollectionQueryHandler,
  NestCollectionRegisteredEventHandler,
  {
    provide: CollectionToken.GetCollectionQueryHandler,
    useFactory: userRepository => new HandleGetCollectionQueryService(userRepository),
    inject: [CollectionToken.CollectionRepository],
  },
  {
    provide: CollectionToken.CollectionRegisteredEventHandler,
    useFactory: postRepository => new HandleCollectionRegisteredEventService(postRepository),
    inject: [CollectionToken.CollectionRepository],
  },
];

@Module({
  providers: [
    CollectionResolver,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  exports: [CollectionToken.CollectionRepository],
})
export class CollectionModule {}
