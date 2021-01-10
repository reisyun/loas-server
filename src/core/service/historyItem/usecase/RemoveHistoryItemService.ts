import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';

import { HistoryItemRepositoryPort } from '@core/domain/historyItem/port/persistence/HistoryItemRepositoryPort';
import { RemoveHistoryItemPort } from '@core/domain/historyItem/port/usecase/RemoveHistoryItemPort';
import { RemoveHistoryItemUseCase } from '@core/domain/historyItem/usecase/RemoveHistoryItemUseCase';

export class RemoveHistoryItemService implements RemoveHistoryItemUseCase {
  private readonly historyItemRepository: HistoryItemRepositoryPort;

  public constructor(historyItemItemRepository: HistoryItemRepositoryPort) {
    this.historyItemRepository = historyItemItemRepository;
  }

  public async execute(payload: RemoveHistoryItemPort): Promise<void> {
    const { executorId, historyItemId } = payload;

    const historyItem: HistoryItem = CoreAssert.notEmpty(
      await this.historyItemRepository.findOne({ where: { id: historyItemId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History item not found.',
      }),
    );

    const hasAccess: boolean = executorId === historyItem.getHistory.getOwnerId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await this.historyItemRepository.remove(historyItem);
  }
}
