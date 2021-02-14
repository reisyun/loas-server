import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { GetHistoryPort } from '@core/domain/history/port/usecase/GetHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { GetHistoryUseCase } from '@core/domain/history/usecase/GetHistoryUseCase';

export class GetHistoryService implements GetHistoryUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: GetHistoryPort): Promise<HistoryUseCaseDto> {
    const { executorId, historyId } = payload;

    const history: History = CoreAssert.notEmpty(
      await this.historyRepository.findOne({ where: { id: historyId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found.',
      }),
    );

    const hasAccess: boolean = executorId === history.getOwnerId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
