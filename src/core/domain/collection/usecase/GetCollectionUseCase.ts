import { UseCase } from '@core/common/UseCase';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Get collection use case
 *
 * - 입력 받은 식별자로 컬렉션을 찾는다.
 * - 컬렉션의 소유자가 아니라면 카테고리가 CUSTOM인 것만 조회 할 수 있다.
 */
export interface GetCollectionUseCase extends UseCase<GetCollectionPort, CollectionUseCaseDto> {}
