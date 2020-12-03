import { UseCase } from '@core/common/UseCase';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Create collection use case
 *
 * - 컬렉션을 생성하려면 유저의 식별자가 필요하다.
 * - 유저를 생성하면 기본적으로 COMPLETED, CURRENT, PLANNING 컬렉션을 제공한다.
 * - 컬렉터가 생성한 모든 컬렉션의 카테고리는 CUSTOM이어야 한다.
 */
export interface CreateCollectionUseCase
  extends UseCase<CreateCollectionPort, CollectionUseCaseDto> {
  /**
   * 유저에게 기본적으로 제공되는 컬렉션들 생성
   */
  registerRequiredCollections(collectorId: string): Promise<void>;
}
