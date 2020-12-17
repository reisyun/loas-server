import { UseCase } from '@core/common/UseCase';
import { GetCollectionListPort } from '@core/domain/collection/port/usecase/GetCollectionListPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Get collection list use case
 *
 * - 입력 받은 식별자로 컬렉션을 찾는다.
 * - name으로 조회하면 컬렉션의 카테고리가 CUSTOM인 것만 가져온다.
 * - 제거된 컬렉션과 삭제된 유저는 제외한다.
 */
export interface GetCollectionListUseCase
  extends UseCase<GetCollectionListPort, CollectionUseCaseDto[]> {}
