import { Nullable } from '@core/common/Types';
import { QueryHandler } from '@core/common/message/query/QueryHandler';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';

export type GetCollectionsQueryHandler = QueryHandler<
  GetCollectionsQuery,
  Nullable<GetCollectionsQueryResult[]>
>;
