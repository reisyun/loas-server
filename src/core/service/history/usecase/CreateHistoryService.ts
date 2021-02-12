import { Nullable } from '@core/common/Types';

import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { CreateHistoryPort } from '@core/domain/history/port/usecase/CreateHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';

export class CreateHistoryService implements CreateHistoryUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: CreateHistoryPort): Promise<HistoryUseCaseDto> {
    const { executorId, mediaId, status, repeat, secret, completedAt } = payload;

    // const history: Nullable<History> = await this.historyRepository.findOne({
    //   where: { userId_mediaId: { userId: executorId, mediaId } },
    // });

    const mockId = 123;

    const history: History = await History.new({
      id: mockId,
      userId: executorId,
      mediaId,
      status,
      repeat,
      secret,
      completedAt,
    });
    await this.historyRepository.create(history);

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
