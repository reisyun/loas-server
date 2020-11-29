import { UseCase } from '@core/common/UseCase';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * Create user use case
 *
 * - 잘못된 이메일 형식인지 검사한다. (어댑터에서 검증)
 * - 비밀번호가 6자 이상인지 검사한다. (어댑터에서 검증)
 * - 이미 존재하는 이메일인지 확인한다.
 * - 비밀번호를 해시로 변환한다. (엔티티에서 변환)
 */
export interface CreateUserUseCase extends UseCase<CreateUserPort, UserUseCaseDto> {}
