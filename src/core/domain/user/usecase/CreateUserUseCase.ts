import { UseCase } from '@core/common/UseCase';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserUseCase extends UseCase<CreateUserPort, UserUseCaseDto> {}
