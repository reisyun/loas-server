type GetUserQueryResultPayload = {
  id: string;
  name: string;
};

export class GetUserQueryResult {
  public readonly id: string;

  public readonly name: string;

  private constructor(payload: GetUserQueryResultPayload) {
    this.id = payload.id;
    this.name = payload.name;
  }

  public static new(payload: GetUserQueryResultPayload): GetUserQueryResult {
    return new GetUserQueryResult(payload);
  }
}
