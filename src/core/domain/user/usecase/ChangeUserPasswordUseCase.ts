import { UseCase } from '@core/common/UseCase';
import { ChangeUserPasswordPort } from '@core/domain/user/port/usecase/ChangeUserPasswordPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * Change user password use case
 *
 * - 입력받은 새로운 비밀번호는 이전 비밀번호와 같으면 안된다.
 * - 입력받은 비밀번호가 저장된 비밀번호와 동일한지 확인한다.
 */
export interface ChangeUserPasswordUseCase
  extends UseCase<ChangeUserPasswordPort, UserUseCaseDto> {}
