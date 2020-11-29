import { UseCase } from '@core/common/UseCase';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Get collection use case
 *
 * - 입력 받은 식별자로 컬렉션을 찾는다.
 * - 제거된 컬렉션과 삭제된 유저는 필터를 통해 제외한다.
 */
export interface GetCollectionUseCase extends UseCase<GetCollectionPort, CollectionUseCaseDto[]> {}
