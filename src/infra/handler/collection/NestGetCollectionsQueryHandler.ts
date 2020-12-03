import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Nullable } from '@core/common/Types';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';
import { GetCollectionsQueryHandler } from '@core/domain/collection/handler/GetCollectionsQueryHandler';
import { CollectionToken } from '@app/token/CollectionToken';

@Injectable()
@QueryHandler(GetCollectionsQuery)
export class NestGetCollectionsQueryHandler implements IQueryHandler {
  private readonly handleService: GetCollectionsQueryHandler;

  constructor(
    @Inject(CollectionToken.GetCollectionsQueryHandler)
    handleService: GetCollectionsQueryHandler,
  ) {
    this.handleService = handleService;
  }

  public async execute(query: GetCollectionsQuery): Promise<Nullable<GetCollectionsQueryResult[]>> {
    return this.handleService.handle(query);
  }
}
