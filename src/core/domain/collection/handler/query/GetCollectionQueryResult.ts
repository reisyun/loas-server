import { Category } from '@core/domain/collection/entity/Collection';

type GetCollectionQueryResultPayload = {
  id: string;
  category: Category;
};

export class GetCollectionQueryResult {
  public readonly id: string;

  public readonly category: Category;

  private constructor(payload: GetCollectionQueryResultPayload) {
    this.id = payload.id;
    this.category = payload.category;
  }

  public static new(payload: GetCollectionQueryResultPayload): GetCollectionQueryResult {
    return new GetCollectionQueryResult(payload);
  }
}
