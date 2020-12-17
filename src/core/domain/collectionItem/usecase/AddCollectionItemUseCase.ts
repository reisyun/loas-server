import { UseCase } from '@core/common/UseCase';
import { AddCollectionItemPort } from '@core/domain/collectionItem/port/usecase/AddCollectionItemPort';
import { CollectionItemUseCaseDto } from '@core/domain/collectionItem/usecase/dto/CollectionItemUseCaseDto';

/**
 * Add collectionItem use case
 *
 * - 컬렉션 아이템을 생성하려면 컬렉션의 식별자가 필요하다.
 * - 컬렉션 카테고리와 미디어 타입을 비교해 규칙에 따라 추가 가능
 */
export interface AddCollectionItemUseCase
  extends UseCase<AddCollectionItemPort, CollectionItemUseCaseDto> {}
