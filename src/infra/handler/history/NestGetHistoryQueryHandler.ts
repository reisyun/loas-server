import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Nullable } from '@core/common/Types';
import { GetHistoryQuery } from '@core/domain/history/handler/query/GetHistoryQuery';
import { GetHistoryQueryResult } from '@core/domain/history/handler/query/GetHistoryQueryResult';
import { GetHistoryQueryHandler } from '@core/domain/history/handler/GetHistoryQueryHandler';
import { HistoryToken } from '@app/token/HistoryToken';

@Injectable()
@QueryHandler(GetHistoryQuery)
export class NestGetHistoryQueryHandler implements IQueryHandler {
  private readonly handleService: GetHistoryQueryHandler;

  constructor(
    @Inject(HistoryToken.GetHistoryQueryHandler)
    handleService: GetHistoryQueryHandler,
  ) {
    this.handleService = handleService;
  }

  public async execute(query: GetHistoryQuery): Promise<Nullable<GetHistoryQueryResult>> {
    return this.handleService.handle(query);
  }
}
