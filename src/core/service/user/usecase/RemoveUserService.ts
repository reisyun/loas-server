import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';

export class RemoveUserService implements RemoveUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  // TODO: `유저`를 삭제 할 때 컬렉션을 `삭제된 유저`에 연결하는 도메인 이벤트 만들기
  public async execute(payload: RemoveUserPort): Promise<void> {
    const { userId, confirm } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: userId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found',
      }),
    );

    CoreAssert.isTrue(confirm, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // Delete User record and Create DeletedUser record
    await this.userRepository.remove(user);
  }
}
