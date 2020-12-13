type GetCollectionQueryPayload = {
  id: string;
};

export class GetCollectionQuery {
  public readonly where: GetCollectionQueryPayload;

  private constructor(where: GetCollectionQueryPayload) {
    this.where = where;
  }

  public static new(where: GetCollectionQueryPayload): GetCollectionQuery {
    return new GetCollectionQuery(where);
  }
}
