import { HistoryCategory } from '@core/common/enums/HistoryEnums';

type GetUserHistoriesQueryResultPayload = {
  id: string;
  ownerId: string;
  category: HistoryCategory;
};

export class GetUserHistoriesQueryResult {
  public readonly id: string;

  public readonly ownerId: string;

  public readonly category: HistoryCategory;

  private constructor(payload: GetUserHistoriesQueryResultPayload) {
    this.id = payload.id;
    this.ownerId = payload.ownerId;
    this.category = payload.category;
  }

  public static new(payload: GetUserHistoriesQueryResultPayload): GetUserHistoriesQueryResult {
    return new GetUserHistoriesQueryResult(payload);
  }
}
