import { Nullable } from '@core/common/Types';
import { QueryHandler } from '@core/common/message/handler/QueryHandler';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';

export type GetUserQueryHandler = QueryHandler<GetUserQuery, Nullable<GetUserQueryResult>>;
