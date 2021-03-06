import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { User } from '@core/domain/user/entity/User';

import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';

export class GetUserService implements GetUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const { executorId, email } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: executorId, email } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found.',
      }),
    );

    return UserUseCaseDto.newFromUser(user);
  }
}
