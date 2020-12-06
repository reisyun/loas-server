import { Nullable } from '@core/common/Types';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';
import { Collection } from '@core/domain/collection/entity/Collection';
import { GetCollectionsQueryHandler } from '@core/domain/collection/handler/GetCollectionsQueryHandler';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';

export class HandleGetCollectionsQueryService implements GetCollectionsQueryHandler {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async handle(query: GetCollectionsQuery): Promise<Nullable<GetCollectionsQueryResult[]>> {
    let queryResult: Nullable<GetCollectionsQueryResult[]> = null;

    const collections: Collection[] = await this.collectionRepository.findMany({
      where: query.where,
    });
    if (collections.length !== 0) {
      queryResult = collections.map(
        (collection: Collection): GetCollectionsQueryResult =>
          GetCollectionsQueryResult.new({
            id: collection.getId,
            category: collection.getCategory,
          }),
      );
    }

    return queryResult;
  }
}
