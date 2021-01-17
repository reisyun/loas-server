import { Nullable } from '@core/common/Types';
import { QueryHandler } from '@core/common/message/handler/QueryHandler';
import { GetHistoryQuery } from '@core/domain/history/handler/query/GetHistoryQuery';
import { GetHistoryQueryResult } from '@core/domain/history/handler/query/GetHistoryQueryResult';

export type GetHistoryQueryHandler = QueryHandler<GetHistoryQuery, Nullable<GetHistoryQueryResult>>;
