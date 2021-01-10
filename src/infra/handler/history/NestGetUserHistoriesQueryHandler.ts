import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserHistoriesQuery } from '@core/domain/history/handler/query/GetUserHistoriesQuery';
import { GetUserHistoriesQueryResult } from '@core/domain/history/handler/query/GetUserHistoriesQueryResult';
import { GetUserHistoriesQueryHandler } from '@core/domain/history/handler/GetUserHistoriesQueryHandler';
import { HistoryToken } from '@app/token/HistoryToken';

@Injectable()
@QueryHandler(GetUserHistoriesQuery)
export class NestGetUserHistoriesQueryHandler implements IQueryHandler {
  private readonly handleService: GetUserHistoriesQueryHandler;

  constructor(
    @Inject(HistoryToken.GetUserHistoriesQueryHandler)
    handleService: GetUserHistoriesQueryHandler,
  ) {
    this.handleService = handleService;
  }

  public async execute(query: GetUserHistoriesQuery): Promise<GetUserHistoriesQueryResult[]> {
    return this.handleService.handle(query);
  }
}
