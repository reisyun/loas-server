import { UseCase } from '@core/common/UseCase';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetUserUseCase extends UseCase<GetUserPort, UserUseCaseDto> {}
