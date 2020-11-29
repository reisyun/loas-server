import { UseCase } from '@core/common/UseCase';
import { EditProfilePort } from '@core/domain/profile//port/usecase/EditProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

/**
 * Edit profile use case
 *
 * - 프로필을 수정할 권한이 있는지 확인한다.
 * - 수정한게 없다면 이전의 상태와 동일해야 한다.
 */
export interface EditProfileUseCase extends UseCase<EditProfilePort, ProfileUseCaseDto> {}
