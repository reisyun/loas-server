import { UseCase } from '@core/common/UseCase';
import { GetProfilePort } from '@core/domain/profile/port/usecase/GetProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

/**
 * Get profile use case
 *
 * - 입력 받은 식별자로 프로필을 찾는다.
 * - 삭제된 유저는 필터를 통해 제외한다.
 */
export interface GetProfileUseCase extends UseCase<GetProfilePort, ProfileUseCaseDto> {}
