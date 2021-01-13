import { Nullable } from '@core/common/Types';
import { History } from '@core/domain/history/entity/History';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { GetHistoryQuery } from '@core/domain/history/handler/query/GetHistoryQuery';
import { GetHistoryQueryResult } from '@core/domain/history/handler/query/GetHistoryQueryResult';
import { GetHistoryQueryHandler } from '@core/domain/history/handler/GetHistoryQueryHandler';

export class HandleGetHistoryQueryService implements GetHistoryQueryHandler {
  private readonly historyRepository: HistoryRepositoryPort;

  constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async handle(query: GetHistoryQuery): Promise<Nullable<GetHistoryQueryResult>> {
    let queryResult: Nullable<GetHistoryQueryResult> = null;

    const userHistories: History[] = await this.historyRepository.findMany({
      where: { ownerId: query.where.ownerId },
    });

    const history = userHistories.find(history => history.getCategory === query.where.category);
    if (history) {
      queryResult = GetHistoryQueryResult.new({
        id: history.getId,
        ownerId: history.getOwnerId,
      });
    }

    return queryResult;
  }
}
