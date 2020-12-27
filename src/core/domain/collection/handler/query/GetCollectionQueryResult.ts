import { Nullable } from '@core/common/Types';

type GetCollectionQueryResultPayload = {
  id: string;
  name: string;
  description: Nullable<string>;
  private: boolean;
};

export class GetCollectionQueryResult {
  public readonly id: string;

  public readonly name: string;

  public readonly description: Nullable<string>;

  public readonly private: boolean;

  private constructor(payload: GetCollectionQueryResultPayload) {
    this.id = payload.id;
    this.name = payload.name;
    this.description = payload.description ?? null;
    this.private = payload.private;
  }

  public static new(payload: GetCollectionQueryResultPayload): GetCollectionQueryResult {
    return new GetCollectionQueryResult(payload);
  }
}
