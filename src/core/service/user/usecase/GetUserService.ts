import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/Types';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class GetUserService implements GetUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const { userId, email } = payload;

    // TODO: 삭제된 유저 필터
    const user: Nullable<User> = await this.userRepository.findOne({
      where: { id: userId, email },
    });

    if (!user) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found.',
      });
    }

    return UserUseCaseDto.newFromUser(user);
  }
}
