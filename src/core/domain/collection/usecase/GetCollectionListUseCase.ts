import { UseCase } from '@core/common/UseCase';
import { GetCollectionListPort } from '@core/domain/collection/port/usecase/GetCollectionListPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Get collection list use case
 *
 * - 입력 받은 식별자로 컬렉션을 찾는다.
 * - 제거된 컬렉션은 가져오기에서 제외한다.
 */
export interface GetCollectionListUseCase
  extends UseCase<GetCollectionListPort, CollectionUseCaseDto[]> {}
