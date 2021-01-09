// import { Code } from '@core/common/exception/Code';
// import { Exception } from '@core/common/exception/Exception';
// import { CoreAssert } from '@core/common/util/CoreAssert';

import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';
import { History } from '@core/domain/historyItem/value-object/History';
import { Media } from '@core/domain/historyItem/value-object/Media';

import { HistoryItemRepositoryPort } from '@core/domain/historyItem/port/persistence/HistoryItemRepositoryPort';
import { AddHistoryItemPort } from '@core/domain/historyItem/port/usecase/AddHistoryItemPort';
import { HistoryItemUseCaseDto } from '@core/domain/historyItem/usecase/dto/HistoryItemUseCaseDto';
import { AddHistoryItemUseCase } from '@core/domain/historyItem/usecase/AddHistoryItemUseCase';

export class AddHistoryItemService implements AddHistoryItemUseCase {
  private readonly historyItemRepository: HistoryItemRepositoryPort;

  public constructor(historyItemItemRepository: HistoryItemRepositoryPort) {
    this.historyItemRepository = historyItemItemRepository;
  }

  public async execute(payload: AddHistoryItemPort): Promise<HistoryItemUseCaseDto> {
    const { executorId, category, mediaId } = payload;

    // TODO: 쿼리로 Media와 History를 가져와 검증 작업 하기.

    const historyItem = await HistoryItem.new({
      history: await History.new(executorId, category),
      media: await Media.new(mediaId),
    });

    return HistoryItemUseCaseDto.newFromHistory(historyItem);
  }
}
