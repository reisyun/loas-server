import { UseCase } from '@core/common/UseCase';
import { EditUserProfilePort } from '@core/domain/user/port/usecase/EditUserProfilePort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * edit user profile use case
 *
 * - 수정한게 없다면 이전의 상태와 동일해야 한다.
 */
export interface EditUserProfileUseCase extends UseCase<EditUserProfilePort, UserUseCaseDto> {}
