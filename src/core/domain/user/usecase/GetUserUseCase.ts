import { UseCase } from '@core/common/UseCase';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * Get user use case
 *
 * - 입력 받은 식별자로 유저를 찾는다.
 * - 삭제된 유저는 필터를 통해 제외한다.
 */
export interface GetUserUseCase extends UseCase<GetUserPort, UserUseCaseDto> {}
