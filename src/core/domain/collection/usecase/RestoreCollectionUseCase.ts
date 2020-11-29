import { UseCase } from '@core/common/UseCase';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Restore collection use case
 *
 * - 컬렉션을 복구할 권한이 있는지 확인한다.
 */
export interface RestoreCollectionUseCase
  extends UseCase<RestoreCollectionPort, CollectionUseCaseDto> {}
