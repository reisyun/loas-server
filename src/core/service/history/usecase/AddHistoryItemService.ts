import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History, HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { AddHistoryItemPort } from '@core/domain/history/port/usecase/AddHistoryItemPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { AddHistoryItemUseCase } from '@core/domain/history/usecase/AddHistoryItemUseCase';

enum MediaStatus {
  RELEASING = 'RELEASING',
  FINISHED = 'FINISHED',
  UNRELEASED = 'UNRELEASED',
  CANCELLED = 'CANCELLED',
}

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
    const { historyId, mediaId } = payload;

    // TODO: 쿼리를 통해 미디어를 검증 후 추가하도록 만들기
    const media: MediaQueryResult = {
      id: mediaId,
      status: MediaStatus.RELEASING,
    };

    const history: History = CoreAssert.notEmpty(
      await this.historyRepository.findOne({ where: { id: historyId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found.',
      }),
    );

    const newHistoryItem: HistoryItem = await HistoryItem.new({ mediaId: media.id });

    //  COMPLETED 카테고리는 FINISHED 상태인 미디어만 추가할 수 있다.
    if (history.getCategory === HistoryCategory.COMPLETED) {
      if (media.status === 'FINISHED') {
        await history.addHistoryItem(newHistoryItem, async () => {
          await newHistoryItem.increaseRepeat();
        });
      }
    }
    // CURRENT 카테고리는 FINISHED, RELEASING 상태인 미디어만 추가할 수 있다.
    if (history.getCategory === HistoryCategory.CURRENT) {
      if (media.status === 'FINISHED' || media.status === 'RELEASING') {
        await history.addHistoryItem(newHistoryItem);
      }
    }
    //  PLANNING 카테고리는 모든 상태의 미디어를 추가할 수 있다.
    if (history.getCategory === HistoryCategory.PLANNING) {
      if (media.status) {
        await history.addHistoryItem(newHistoryItem);
      }
    }

    await this.historyRepository.update(history);

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
