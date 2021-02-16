import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { ChangeHistoryStatusPort } from '@core/domain/history/port/usecase/ChangeHistoryStatusPort';
import { ChangeHistoryStatusUseCase } from '@core/domain/history/usecase/ChangeHistoryStatusUseCase';

export class ChangeHistoryStatusService implements ChangeHistoryStatusUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: ChangeHistoryStatusPort): Promise<void> {
    const { executorId, historyId, status } = payload;

    const history: History = CoreAssert.notEmpty(
      await this.historyRepository.findOne({ where: { id: historyId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found.',
      }),
    );

    const hasAccess: boolean = executorId === history.getOwnerId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await history.changeStatus(status);

    await this.historyRepository.update(history);
  }
}
