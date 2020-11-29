import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * 유저 생성 서비스
 *
 * 1. 이메일 중복 확인
 * 2. 입력받은 데이터를 통해 유저 생성
 * 3. 프로필를 데이터베이스에 저장
 * 4. 유저를 내보냄
 */
export class CreateUserService implements CreateUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const { name, email, password } = payload;

    // 이미 존재하는 이메일인지 확인
    const doesEmailExist = !!(await this.userRepository.count({ where: { email } }));
    if (doesEmailExist) {
      throw Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'This email already exists.',
      });
    }

    const user: User = await User.new({ name, email, password });
    await this.userRepository.create(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
