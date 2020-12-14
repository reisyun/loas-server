import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { EventBusPort } from '@core/common/message/event/EventBusPort';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';

export class CreateUserService implements CreateUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  private readonly eventBus: EventBusPort;

  public constructor(userRepository: UserRepositoryPort, eventBus: EventBusPort) {
    this.userRepository = userRepository;
    this.eventBus = eventBus;
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

    const user: User = await User.new({
      profile: await Profile.new(),
      name,
      email,
      password,
    });
    await this.userRepository.create(user);

    // 이벤트를 전달해 필수 컬렉션들 등록
    await this.eventBus.sendEvent(UserCreatedEvent.new({ id: user.getId, name: user.getName }));

    return UserUseCaseDto.newFromUser(user);
  }
}
