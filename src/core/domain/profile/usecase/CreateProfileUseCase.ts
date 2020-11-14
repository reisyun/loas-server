import { UseCase } from '@core/common/UseCase';
import { CreateProfilePort } from '@core/domain/profile/port/usecase/CreateProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateProfileUseCase extends UseCase<CreateProfilePort, ProfileUseCaseDto> {}
