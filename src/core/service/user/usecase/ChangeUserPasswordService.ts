import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { ChangeUserPasswordPort } from '@core/domain/user/port/usecase/ChangeUserPasswordPort';
import { ChangeUserPasswordUseCase } from '@core/domain/user/usecase/ChangeUserPasswordUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class ChangeUserPasswordService implements ChangeUserPasswordUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: ChangeUserPasswordPort): Promise<UserUseCaseDto> {
    const { userId, oldPassword, newPassword } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: userId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found',
      }),
    );

    const hasAccess: boolean = await user.comparePassword(oldPassword);
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await user.edit({ password: newPassword });
    await this.userRepository.update(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
