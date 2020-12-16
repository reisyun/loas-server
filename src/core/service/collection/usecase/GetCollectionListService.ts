import { Collection } from '@core/domain/collection/entity/Collection';

import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { GetCollectionListPort } from '@core/domain/collection/port/usecase/GetCollectionListPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { GetCollectionListUseCase } from '@core/domain/collection/usecase/GetCollectionListUseCase';

export class GetCollectionListService implements GetCollectionListUseCase {
  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async execute(payload: GetCollectionListPort): Promise<CollectionUseCaseDto[]> {
    const { collectorId, name } = payload;

    // TODO: name으로 검색 시 Category.CUSTOM만 가져오도록 하기
    // 원활한 검색을 위해 테이블의 name을 UPPERCASE 따로 저장할지 고민
    const collectionList: Collection[] = await this.collectionRepository.findMany({
      where: {
        collectorId,
        name: { contains: name },

        // Filter removed records
        removedAt: null,
        deletedCollectorId: null,
      },
    });

    return CollectionUseCaseDto.newListFromCollections(collectionList);
  }
}
