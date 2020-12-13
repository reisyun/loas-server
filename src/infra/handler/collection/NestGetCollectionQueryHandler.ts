import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Nullable } from '@core/common/Types';
import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';
import { GetCollectionQueryHandler } from '@core/domain/collection/handler/GetCollectionQueryHandler';
import { CollectionToken } from '@app/token/CollectionToken';

@Injectable()
@QueryHandler(GetCollectionQuery)
export class NestGetCollectionQueryHandler implements IQueryHandler {
  private readonly handleService: GetCollectionQueryHandler;

  constructor(
    @Inject(CollectionToken.GetCollectionQueryHandler)
    handleService: GetCollectionQueryHandler,
  ) {
    this.handleService = handleService;
  }

  public async execute(query: GetCollectionQuery): Promise<Nullable<GetCollectionQueryResult>> {
    return this.handleService.handle(query);
  }
}
