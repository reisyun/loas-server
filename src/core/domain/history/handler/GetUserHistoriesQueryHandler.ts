import { QueryHandler } from '@core/common/message/handler/QueryHandler';
import { GetUserHistoriesQuery } from '@core/domain/history/handler/query/GetUserHistoriesQuery';
import { GetUserHistoriesQueryResult } from '@core/domain/history/handler/query/GetUserHistoriesQueryResult';

export type GetUserHistoriesQueryHandler = QueryHandler<
  GetUserHistoriesQuery,
  GetUserHistoriesQueryResult[]
>;
