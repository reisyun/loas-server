import { UseCase } from '@core/common/UseCase';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveUserUseCase extends UseCase<RemoveUserPort, UserUseCaseDto> {}
