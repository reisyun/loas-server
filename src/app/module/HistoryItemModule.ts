import { Module, Provider } from '@nestjs/common';

import { AddHistoryItemService } from '@core/service/historyItem/usecase/AddHistoryItemService';

import { CoreToken } from '@app/token/CoreToken';
import { HistoryItemToken } from '@app/token/HistoryItemToken';
import { HistoryItemResolver } from '@app/api/graphql/resolver/historyItem/HistoryItemResolver';
import { HistoryItemRepositoryAdapter } from '@infra/adapter/persistence/repository/HistoryItemRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: HistoryItemToken.HistoryItemRepository,
    useClass: HistoryItemRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: HistoryItemToken.AddHistoryItemUseCase,
    useFactory: (historyItemReoisitory, queryBus) =>
      new AddHistoryItemService(historyItemReoisitory, queryBus),
    inject: [HistoryItemToken.HistoryItemRepository, CoreToken.QueryBus],
  },
];

@Module({
  providers: [HistoryItemResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [HistoryItemToken.HistoryItemRepository],
})
export class HistoryItemModule {}
