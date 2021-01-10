import { History } from '@core/domain/history/entity/History';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { GetUserHistoriesQuery } from '@core/domain/history/handler/query/GetUserHistoriesQuery';
import { GetUserHistoriesQueryResult } from '@core/domain/history/handler/query/GetUserHistoriesQueryResult';
import { GetUserHistoriesQueryHandler } from '@core/domain/history/handler/GetUserHistoriesQueryHandler';

export class HandleGetUserHistoriesQueryService implements GetUserHistoriesQueryHandler {
  private readonly historyRepository: HistoryRepositoryPort;

  constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async handle(query: GetUserHistoriesQuery): Promise<GetUserHistoriesQueryResult[]> {
    let queryResult: GetUserHistoriesQueryResult[] = [];

    const userHistories: History[] = await this.historyRepository.findMany({
      where: query.where,
    });

    queryResult = userHistories.map((history: History) =>
      GetUserHistoriesQueryResult.new({
        id: history.getId,
        category: history.getCategory,
      }),
    );

    return queryResult;
  }
}
