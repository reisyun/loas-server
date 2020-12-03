type GetCollectionsQueryPayload = {
  collectionId?: string;
  collectorId?: string;
};

export class GetCollectionsQuery {
  public readonly where: GetCollectionsQueryPayload;

  private constructor(where: GetCollectionsQueryPayload) {
    this.where = where;
  }

  public static new(where: GetCollectionsQueryPayload): GetCollectionsQuery {
    return new GetCollectionsQuery(where);
  }
}
