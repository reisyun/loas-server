type GetHistoryQueryResultPayload = {
  id: string;
  ownerId: string;
  historyItems: Array<{ mediaId: string }>;
};

export class GetHistoryQueryResult {
  public readonly id: string;

  public readonly ownerId: string;

  public readonly historyItems: Array<{ mediaId: string }>;

  private constructor(payload: GetHistoryQueryResultPayload) {
    this.id = payload.id;
    this.ownerId = payload.ownerId;
    this.historyItems = payload.historyItems;
  }

  public static new(payload: GetHistoryQueryResultPayload): GetHistoryQueryResult {
    return new GetHistoryQueryResult(payload);
  }
}
