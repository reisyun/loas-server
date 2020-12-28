import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { User } from '@core/domain/user/entity/User';

import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';

import { EventBusPort } from '@core/common/message/port/EventBusPort';
import { UserDeletedEvent } from '@core/domain/user/handler/event/UserDeletedEvent';

export class RemoveUserService implements RemoveUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  private readonly eventBus: EventBusPort;

  public constructor(userRepository: UserRepositoryPort, eventBus: EventBusPort) {
    this.userRepository = userRepository;
    this.eventBus = eventBus;
  }

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

    await user.remove();
    await this.userRepository.remove(user);

    // Remove history
    await this.eventBus.sendEvent(UserDeletedEvent.new({ id: user.getId }));
  }
}
