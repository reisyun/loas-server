import { History } from '@core/domain/history/entity/History';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { GetHistoryListPort } from '@core/domain/history/port/usecase/GetHistoryListPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { GetHistoryListUseCase } from '@core/domain/history/usecase/GetHistoryListUseCase';

export class GetHistoryListService implements GetHistoryListUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: GetHistoryListPort): Promise<HistoryUseCaseDto[]> {
    const { executorId, ownerId, status } = payload;

    // TODO: 변수 이름 생각 및 리팩토링하기
    const mine = executorId === ownerId ? undefined : false;

    const histories: History[] = await this.historyRepository.findMany({
      where: {
        userId: ownerId,
        status,
        secret: mine,
      },
    });

    return HistoryUseCaseDto.newListFromHistories(histories);
  }
}
