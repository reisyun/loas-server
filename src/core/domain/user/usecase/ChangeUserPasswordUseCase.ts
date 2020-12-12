import { UseCase } from '@core/common/UseCase';
import { ChangeUserPasswordPort } from '@core/domain/user/port/usecase/ChangeUserPasswordPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * change user password use case
 *
 * - 입력받은 비밀번호가 저장된 비밀번호와 동일한지 확인한다.
 */
export interface ChangeUserPasswordUseCase
  extends UseCase<ChangeUserPasswordPort, UserUseCaseDto> {}
