import { UseCase } from '@core/common/UseCase';
import { GetProfilePort } from '@core/domain/profile/port/usecase/GetProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetProfileUseCase extends UseCase<GetProfilePort, ProfileUseCaseDto> {}
