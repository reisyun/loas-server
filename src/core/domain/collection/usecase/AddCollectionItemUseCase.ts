import { UseCase } from '@core/common/UseCase';
import { AddCollectionItemPort } from '@core/domain/collection/port/usecase/AddCollectionItemPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

/**
 * Add collection item use case
 *
 * - 모든 미디어를 추가 가능하다.
 */
export interface AddCollectionItemUseCase
  extends UseCase<AddCollectionItemPort, CollectionUseCaseDto> {}
