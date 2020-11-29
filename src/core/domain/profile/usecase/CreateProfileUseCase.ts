import { UseCase } from '@core/common/UseCase';
import { CreateProfilePort } from '@core/domain/profile/port/usecase/CreateProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

/**
 * Create profile use case
 *
 * - 프로필을 생성하려면 유저의 식별자가 필요하다.
 */
export interface CreateProfileUseCase extends UseCase<CreateProfilePort, ProfileUseCaseDto> {}
