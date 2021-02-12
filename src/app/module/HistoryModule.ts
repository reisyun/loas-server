import { Module, Provider } from '@nestjs/common';

import { CreateHistoryService } from '@core/service/history/usecase/CreateHistoryService';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryResolver } from '@app/api/graphql/resolver/history/HistoryResolver';
import { HistoryRepositoryAdapter } from '@infra/adapter/persistence/repository/HistoryRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: HistoryToken.HistoryRepository,
    useClass: HistoryRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: HistoryToken.CreateHistoryUseCase,
    useFactory: historyRepository => new CreateHistoryService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
];

@Module({
  providers: [HistoryResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [HistoryToken.HistoryRepository],
})
export class HistoryModule {}
