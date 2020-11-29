import { UseCase } from '@core/common/UseCase';
import { EditCollectionPort } from '@core/domain/collection/port/usecase/EditCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Edit collection use case
 *
 * - 컬렉션을 수정할 권한이 있는지 확인한다.
 * - 수정한게 없다면 이전의 상태와 동일해야 한다.
 */
export interface EditCollectionUseCase extends UseCase<EditCollectionPort, CollectionUseCaseDto> {}
