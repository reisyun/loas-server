import { Nullable } from '@core/common/Types';
import { QueryHandler } from '@core/common/message/handler/QueryHandler';
import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';

export type GetCollectionQueryHandler = QueryHandler<
  GetCollectionQuery,
  Nullable<GetCollectionQueryResult>
>;
