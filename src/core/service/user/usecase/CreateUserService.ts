import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/profile/entity/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';

export class CreateUserService implements CreateUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  private readonly profileRepository: ProfileRepositoryPort;

  public constructor(userRepository: UserRepositoryPort, profileRepository: ProfileRepositoryPort) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const { name, email, password } = payload;

    // 이미 존재하는 이메일인지 확인
    const doesEmailExist = !!(await this.userRepository.count({ email }));
    if (doesEmailExist) {
      throw Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'This email already exists.',
      });
    }

    // 유저 생성
    const user: User = await User.new({ name, email, password });
    await this.userRepository.create(user);

    // 프로필 생성
    const profileId = await this.profileRepository.count();
    const profile: Profile = await Profile.new({ userId: user.getId, id: profileId });
    await this.profileRepository.create(user.getId, profile);

    return UserUseCaseDto.newFromUser(user);
  }
}
