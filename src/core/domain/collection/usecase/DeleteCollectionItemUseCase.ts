import { UseCase } from '@core/common/UseCase';
import { DeleteCollectionItemPort } from '@core/domain/collection/port/usecase/DeleteCollectionItemPort';

/**
 * Delete collection item use case
 *
 * - 입력 받은 식별자로 컬렉션을 찾는다.
 * - 제거할 미디어가 컬렉션에 존재하는지 확인한다.
 * - 컬렉션 아이템을 하드 삭제한다.
 */
export interface DeleteCollectionItemUseCase extends UseCase<DeleteCollectionItemPort, void> {}
