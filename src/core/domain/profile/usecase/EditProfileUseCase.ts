import { UseCase } from '@core/common/UseCase';
import { EditProfilePort } from '@core/domain/profile//port/usecase/EditProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditProfileUseCase extends UseCase<EditProfilePort, ProfileUseCaseDto> {}
