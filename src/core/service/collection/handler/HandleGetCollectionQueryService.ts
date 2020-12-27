import { Nullable } from '@core/common/Types';
import { Collection } from '@core/domain/collection/entity/Collection';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionQuery } from '@core/domain/collection/handler/query/GetCollectionQuery';
import { GetCollectionQueryResult } from '@core/domain/collection/handler/query/GetCollectionQueryResult';
import { GetCollectionQueryHandler } from '@core/domain/collection/handler/GetCollectionQueryHandler';

export class HandleGetCollectionQueryService implements GetCollectionQueryHandler {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async handle(query: GetCollectionQuery): Promise<Nullable<GetCollectionQueryResult>> {
    let queryResult: Nullable<GetCollectionQueryResult> = null;

    const collection: Nullable<Collection> = await this.collectionRepository.findOne({
      where: query.where,
    });
    if (collection) {
      queryResult = GetCollectionQueryResult.new({
        id: collection.getId,
        name: collection.getName,
        description: collection.getDescription,
        private: collection.getPrivate,
      });
    }
    return queryResult;
  }
}
