type GetUserHistoriesQueryPayload = {
  ownerId: string;
};

export class GetUserHistoriesQuery {
  public readonly where: GetUserHistoriesQueryPayload;

  private constructor(where: GetUserHistoriesQueryPayload) {
    this.where = where;
  }

  public static new(where: GetUserHistoriesQueryPayload): GetUserHistoriesQuery {
    return new GetUserHistoriesQuery(where);
  }
}
