type GetHistoryQueryResultPayload = {
  id: string;
  ownerId: string;
};

export class GetHistoryQueryResult {
  public readonly id: string;

  public readonly ownerId: string;

  private constructor(payload: GetHistoryQueryResultPayload) {
    this.id = payload.id;
    this.ownerId = payload.ownerId;
  }

  public static new(payload: GetHistoryQueryResultPayload): GetHistoryQueryResult {
    return new GetHistoryQueryResult(payload);
  }
}
