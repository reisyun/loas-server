type GetUserQueryPayload = {
  id: string;
};

export class GetUserQuery {
  public readonly where: GetUserQueryPayload;

  private constructor(where: GetUserQueryPayload) {
    this.where = where;
  }

  public static new(where: GetUserQueryPayload): GetUserQuery {
    return new GetUserQuery(where);
  }
}
