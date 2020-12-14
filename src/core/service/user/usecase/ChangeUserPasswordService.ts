import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { User } from '@core/domain/user/entity/User';

import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { ChangeUserPasswordPort } from '@core/domain/user/port/usecase/ChangeUserPasswordPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { ChangeUserPasswordUseCase } from '@core/domain/user/usecase/ChangeUserPasswordUseCase';

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

    // 입력받은 비밀번호가 저장된 비밀번호와 동일한지 확인
    const hasAccess: boolean = await user.comparePassword(oldPassword);
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // 새로운 비밀번호가 이전과 같으면 에러
    CoreAssert.isFalse(
      newPassword === oldPassword,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: "new password can't be old password",
      }),
    );

    await user.edit({ password: newPassword });
    await this.userRepository.update(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
