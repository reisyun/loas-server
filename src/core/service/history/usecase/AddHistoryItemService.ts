import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { Media, MediaStatus } from '@core/domain/history/value-object/Media';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { AddHistoryItemPort } from '@core/domain/history/port/usecase/AddHistoryItemPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { AddHistoryItemUseCase } from '@core/domain/history/usecase/AddHistoryItemUseCase';

interface MediaQueryResult {
  id: string;
  status: MediaStatus;
}

export class AddHistoryItemService implements AddHistoryItemUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: AddHistoryItemPort): Promise<HistoryUseCaseDto> {
    const { executorId, category, mediaId } = payload;

    // TODO: 쿼리를 통해 미디어를 검증 후 추가하도록 만들기
    const media: MediaQueryResult = {
      id: mediaId,
      status: MediaStatus.FINISHED,
    };

    const userHistories: History[] = CoreAssert.notEmpty(
      await this.historyRepository.findMany({ where: { ownerId: executorId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User histories not found',
      }),
    );

    const history: History = CoreAssert.notEmpty(
      userHistories.find(history => history.getCategory === category),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found',
      }),
    );

    const newHistoryItem: HistoryItem = await HistoryItem.new({
      media: await Media.new(media.id, media.status),
    });

    await history.addHistoryItem(newHistoryItem);
    await this.historyRepository.update(history);

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
