import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class RemoveUserService implements RemoveUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: RemoveUserPort): Promise<UserUseCaseDto> {
    const { userId, confirm } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: userId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found',
      }),
    );

    CoreAssert.isTrue(confirm, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // soft delete
    await user.remove();
    await this.userRepository.update(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
