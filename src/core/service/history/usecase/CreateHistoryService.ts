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

    // TODO: 미디어가 존재하는지 확인하기

    // TODO: '기록이 이미 존재하는가?'에 따라 분기 또는 다른 방안 생각해보기
    // 현재 merge방식으로 DB에 저장하는데, update할 경우 이전 상태를 버리고 새로운 상태를 덮어쓰는 문제가 있음

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
