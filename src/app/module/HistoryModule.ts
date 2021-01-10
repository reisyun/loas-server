import { Module, Provider } from '@nestjs/common';

import { GetHistoryService } from '@core/service/history/usecase/GetHistoryService';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryResolver } from '@app/api/graphql/resolver/history/HistoryResolver';
import { HistoryRepositoryAdapter } from '@infra/adapter/persistence/repository/HistoryRepositoryAdapter';

import { HandleGetUserHistoriesQueryService } from '@core/service/history/handler/HandleGetUserHistoriesQueryService';
import { NestGetUserHistoriesQueryHandler } from '@infra/handler/history/NestGetUserHistoriesQueryHandler';

import { HandleHistoryRegisteredEventService } from '@core/service/history/handler/HandleHistoryRegisteredEventService';
import { NestHistoryRegisteredEventHandler } from '@infra/handler/history/NestHistoryRegisteredEventHandler';

import { HandleHistoryRemovedEventService } from '@core/service/history/handler/HandleHistoryRemovedEventService';
import { NestHistoryRemovedEventHandler } from '@infra/handler/history/NestHistoryRemovedEventHandler';

const persistenceProviders: Provider[] = [
  {
    provide: HistoryToken.HistoryRepository,
    useClass: HistoryRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: HistoryToken.GetHistoryUseCase,
    useFactory: historyReoisitory => new GetHistoryService(historyReoisitory),
    inject: [HistoryToken.HistoryRepository],
  },
];

const handlerProviders: Provider[] = [
  NestGetUserHistoriesQueryHandler,
  NestHistoryRegisteredEventHandler,
  NestHistoryRemovedEventHandler,
  {
    provide: HistoryToken.GetUserHistoriesQueryHandler,
    useFactory: historyRepository => new HandleGetUserHistoriesQueryService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
  {
    provide: HistoryToken.HistoryRegisteredEventHandler,
    useFactory: historyRepository => new HandleHistoryRegisteredEventService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
  {
    provide: HistoryToken.HistoryRemovedEventHandler,
    useFactory: historyRepository => new HandleHistoryRemovedEventService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
];

@Module({
  providers: [HistoryResolver, ...persistenceProviders, ...useCaseProviders, ...handlerProviders],
  exports: [HistoryToken.HistoryRepository],
})
export class HistoryModule {}
