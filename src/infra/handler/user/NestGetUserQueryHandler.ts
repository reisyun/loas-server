import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Nullable } from '@core/common/Types';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { GetUserQueryHandler } from '@core/domain/user/handler/GetUserQueryHandler';
import { UserToken } from '@app/token/UserToken';

@Injectable()
@QueryHandler(GetUserQuery)
export class NestGetUserQueryHandler implements IQueryHandler {
  private readonly handleService: GetUserQueryHandler;

  constructor(@Inject(UserToken.GetUserQueryHandler) handleService: GetUserQueryHandler) {
    this.handleService = handleService;
  }

  public async execute(query: GetUserQuery): Promise<Nullable<GetUserQueryResult>> {
    return this.handleService.handle(query);
  }
}
