import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';
import { History } from '@core/domain/historyItem/value-object/History';
import { Media } from '@core/domain/historyItem/value-object/Media';

import { HistoryItemRepositoryPort } from '@core/domain/historyItem/port/persistence/HistoryItemRepositoryPort';
import { AddHistoryItemPort } from '@core/domain/historyItem/port/usecase/AddHistoryItemPort';
import { HistoryItemUseCaseDto } from '@core/domain/historyItem/usecase/dto/HistoryItemUseCaseDto';
import { AddHistoryItemUseCase } from '@core/domain/historyItem/usecase/AddHistoryItemUseCase';

import { QueryBusPort } from '@core/common/message/port/QueryBusPort';
import { GetUserHistoriesQuery } from '@core/domain/history/handler/query/GetUserHistoriesQuery';
import { GetUserHistoriesQueryResult } from '@core/domain/history/handler/query/GetUserHistoriesQueryResult';

export class AddHistoryItemService implements AddHistoryItemUseCase {
  private readonly historyItemRepository: HistoryItemRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(historyItemItemRepository: HistoryItemRepositoryPort, queryBus: QueryBusPort) {
    this.historyItemRepository = historyItemItemRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: AddHistoryItemPort): Promise<HistoryItemUseCaseDto> {
    const { executorId, category, mediaId } = payload;

    // TODO: 쿼리로 Media를 가져와 검증 작업 추가하기.

    const userHistories: GetUserHistoriesQueryResult[] = await this.queryBus.sendQuery(
      GetUserHistoriesQuery.new({ ownerId: executorId }),
    );

    const history = CoreAssert.notEmpty(
      userHistories.find(history => history.category === category),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'History not found',
      }),
    );

    const historyItem: HistoryItem = await HistoryItem.new({
      history: await History.new(history.id, history.category),
      media: await Media.new(mediaId),
    });

    await this.historyItemRepository.create(historyItem);

    return HistoryItemUseCaseDto.newFromHistory(historyItem);
  }
}
