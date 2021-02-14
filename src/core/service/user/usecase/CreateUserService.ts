import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';

import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';

export class CreateUserService implements CreateUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const { name, email, password } = payload;

    // 이미 존재하는 이메일인지 확인
    const doesEmailExist = !!(await this.userRepository.count({ where: { email } }));

    CoreAssert.isFalse(
      doesEmailExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'This email already exists.',
      }),
    );

    const user: User = await User.new({
      name,
      email,
      password,
      profile: await Profile.new(),
    });

    await this.userRepository.create(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
