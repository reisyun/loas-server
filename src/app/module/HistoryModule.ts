import { Module, Provider } from '@nestjs/common';

import { GetHistoryService } from '@core/service/history/usecase/GetHistoryService';
import { CreateHistoryService } from '@core/service/history/usecase/CreateHistoryService';
import { EditHistoryService } from '@core/service/history/usecase/EditHistoryService';
import { ChangeHistoryStatusService } from '@core/service/history/usecase/ChangeHistoryStatusService';

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
    provide: HistoryToken.GetHistoryUseCase,
    useFactory: historyRepository => new GetHistoryService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
  {
    provide: HistoryToken.CreateHistoryUseCase,
    useFactory: historyRepository => new CreateHistoryService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
  {
    provide: HistoryToken.EditHistoryUseCase,
    useFactory: historyRepository => new EditHistoryService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
  {
    provide: HistoryToken.ChangeHistoryStatusUseCase,
    useFactory: historyRepository => new ChangeHistoryStatusService(historyRepository),
    inject: [HistoryToken.HistoryRepository],
  },
];

@Module({
  providers: [HistoryResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [HistoryToken.HistoryRepository],
})
export class HistoryModule {}
