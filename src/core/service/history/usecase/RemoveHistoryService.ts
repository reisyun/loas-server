import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { RemoveHistoryPort } from '@core/domain/history/port/usecase/RemoveHistoryPort';
import { RemoveHistoryUseCase } from '@core/domain/history/usecase/RemoveHistoryUseCase';

export class RemoveHistoryService implements RemoveHistoryUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: RemoveHistoryPort): Promise<void> {
    const { executorId, historyId } = payload;

    const history: History = CoreAssert.notEmpty(
      await this.historyRepository.findOne({ where: { id: historyId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found',
      }),
    );

    // 기록을 제거할 권한이 있는지 확인한다
    const hasAccess: boolean = executorId === history.getOwnerId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await this.historyRepository.delete(history);
  }
}
