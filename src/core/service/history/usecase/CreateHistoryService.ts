import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { CreateHistoryPort } from '@core/domain/history/port/usecase/CreateHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';
import { Media } from '@core/domain/history/value-object/Media';

export class CreateHistoryService implements CreateHistoryUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: CreateHistoryPort): Promise<HistoryUseCaseDto> {
    const { executorId, mediaId, status, repeat, secret, completedAt } = payload;

    const history: History = await History.new({
      media: new Media(mediaId),
      ownerId: executorId,
      status,
      repeat,
      secret,
      completedAt,
    });

    await this.historyRepository.merge(history);

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
