import { Category } from '@core/domain/collection/entity/Collection';

type GetCollectionsQueryResultPayload = {
  id: string;
  category: Category;
};

export class GetCollectionsQueryResult {
  public readonly id: string;

  public readonly category: Category;

  private constructor(payload: GetCollectionsQueryResultPayload) {
    this.id = payload.id;
    this.category = payload.category;
  }

  public static new(payload: GetCollectionsQueryResultPayload): GetCollectionsQueryResult {
    return new GetCollectionsQueryResult({
      id: payload.id,
      category: payload.category,
    });
  }
}
