import { HistoryCategory } from '@core/domain/history/entity/History';

type GetUserHistoriesQueryResultPayload = {
  id: string;
  category: HistoryCategory;
};

export class GetUserHistoriesQueryResult {
  public readonly id: string;

  public readonly category: HistoryCategory;

  private constructor(payload: GetUserHistoriesQueryResultPayload) {
    this.id = payload.id;
    this.category = payload.category;
  }

  public static new(payload: GetUserHistoriesQueryResultPayload): GetUserHistoriesQueryResult {
    return new GetUserHistoriesQueryResult(payload);
  }
}
