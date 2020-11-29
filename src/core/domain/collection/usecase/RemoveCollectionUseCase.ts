import { UseCase } from '@core/common/UseCase';
import { RemoveCollectionPort } from '@core/domain/collection/port/usecase/RemoveCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Remove collection use case
 *
 * - 컬렉션을 제거할 권한이 있는지 확인한다.
 * - 소프트 삭제를 통해 제거한 컬렉션이 데이터베이스 레코드에 남아 있도록 한다.
 */
export interface RemoveCollectionUseCase
  extends UseCase<RemoveCollectionPort, CollectionUseCaseDto> {}
