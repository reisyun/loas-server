import { Module, Provider } from '@nestjs/common';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryRepositoryAdapter } from '@infra/adapter/persistence/repository/HistoryRepositoryAdapter';

import { HandleHistoryRegisteredEventService } from '@core/service/history/handler/HandleHistoryRegisteredEventService';
import { NestHistoryRegisteredEventHandler } from '@infra/handler/history/NestHistoryRegisteredEventHandler';

const persistenceProviders: Provider[] = [
  {
    provide: HistoryToken.HistoryRepository,
    useClass: HistoryRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [];

const handlerProviders: Provider[] = [
  NestHistoryRegisteredEventHandler,
  {
    provide: HistoryToken.HistoryRegisteredEventHandler,
    useFactory: historyRepository => new HandleHistoryRegisteredEventService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
];

@Module({
  providers: [...persistenceProviders, ...useCaseProviders, ...handlerProviders],
  exports: [HistoryToken.HistoryRepository],
})
export class HistoryModule {}
