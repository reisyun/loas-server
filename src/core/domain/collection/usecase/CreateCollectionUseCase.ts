import { UseCase } from '@core/common/UseCase';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Create collection use case
 *
 * - 컬렉션을 생성하려면 수집가의 식별자가 필요하다.
 * - 수집가는 컬렉션을 무한정 생성할 수 있다.
 */
export interface CreateCollectionUseCase
  extends UseCase<CreateCollectionPort, CollectionUseCaseDto> {}
