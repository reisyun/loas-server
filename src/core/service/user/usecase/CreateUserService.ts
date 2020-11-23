import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/profile/entity/Profile';
import { Collection } from '@core/domain/collection/entity/Collection';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

/**
 * 유저 생성
 *
 * @param payload name, email, password
 * @return User
 *
 * Basic Flow
 * 1. 이메일 중복 확인
 * 2. 유저 생성
 * 3. 프로필을 생성 후 유저와 연결
 * 4. 필수 컬렉션을 생성 후 유저와 연결
 * 5. 유저 정보를 내보냄
 */
export class CreateUserService implements CreateUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  private readonly profileRepository: ProfileRepositoryPort;

  private readonly collectionRepository: CollectionRepositoryPort;

  public constructor(
    userRepository: UserRepositoryPort,
    profileRepository: ProfileRepositoryPort,
    collectionRepository: CollectionRepositoryPort,
  ) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
    this.collectionRepository = collectionRepository;
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

    // 유저 생성
    const user: User = await User.new({ name, email, password });
    await this.userRepository.create(user);

    await this.createProfile(user.getId);
    await this.createLibraries(user.getId);

    return UserUseCaseDto.newFromUser(user);
  }

  /**
   * 프로필 생성
   *
   * @param userId
   */
  private async createProfile(userId: string): Promise<void> {
    // Profile ID는 autoincrement로 설계, ID의 영속성을 위해 DB 조회 필요
    const profileId: number = (await this.profileRepository.count()) + 1;
    const profile: Profile = await Profile.new({ userId, id: profileId });

    await this.profileRepository.create(profile);
  }

  /**
   * 필수 컬렉션 생성
   *
   * @param userId
   */
  private async createLibraries(userId: string): Promise<void> {
    const completedCollection: Collection = await Collection.new({
      name: 'COMPLETED',
      isCustom: false,
      userId,
    });
    const favoriteCollection: Collection = await Collection.new({
      name: 'FAVORITE',
      isCustom: false,
      userId,
    });

    await this.collectionRepository.create(completedCollection);
    await this.collectionRepository.create(favoriteCollection);
  }
}
