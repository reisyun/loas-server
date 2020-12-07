import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { EditUserProfilePort } from '@core/domain/user/port/usecase/EditUserProfilePort';
import { EditUserProfileUseCase } from '@core/domain/user/usecase/EditUserProfileUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class EditUserProfileService implements EditUserProfileUseCase {
  private readonly userRepository: UserRepositoryPort;

  public constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async execute(payload: EditUserProfilePort): Promise<UserUseCaseDto> {
    const { userId, shortBio, avatar, gender, language } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: userId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found.',
      }),
    );

    await user.editProfile({ shortBio, avatar, gender, language });
    await this.userRepository.update(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
