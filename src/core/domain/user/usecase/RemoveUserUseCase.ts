import { UseCase } from '@core/common/UseCase';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';

/**
 * Remove user use case
 *
 * - 유저에게 제거할 의사가 있는지 확인한다.
 * - 데이터베이스에서 User 레코드를 삭제하고,
 * - DeletedUser 레코드를 생성해 필요한 데이터들을 옮긴다.
 */
export interface RemoveUserUseCase extends UseCase<RemoveUserPort, void> {}
