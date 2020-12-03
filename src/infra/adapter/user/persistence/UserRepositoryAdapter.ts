import { Nullable } from '@core/common/Types';
import { UserRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { UserMapper, PrismaUserAggregate } from '@infra/adapter/user/persistence/UserMapper';

export class UserRepositoryAdapter extends PrismaRepository implements UserRepositoryPort {
  public async findOne(args: UserRepositoryArgs.FindOne): Promise<Nullable<User>> {
    let userDomain: Nullable<User> = null;
    const user: Nullable<PrismaUserAggregate> = await this.user.findUnique({
      ...args,
      include: { profile: true },
    });
    if (user) {
      userDomain = UserMapper.toDomainEntity(user);
    }

    return userDomain;
  }

  public async findMany(args?: UserRepositoryArgs.FindMany): Promise<User[]> {
    const users: Nullable<PrismaUserAggregate[]> = await this.user.findMany({
      ...args,
      include: { profile: true },
    });
    const usersDomain: User[] = UserMapper.toDomainEntities(users);

    return usersDomain;
  }

  public async count(args?: UserRepositoryArgs.FindMany): Promise<number> {
    const countUser: number = await this.user.count(args);

    return countUser;
  }

  public async create(user: User): Promise<User> {
    const profile = user.getProfile;

    const newUser: PrismaUserAggregate = await this.user.create({
      data: {
        id: user.getId,
        name: user.getName,
        email: user.getEmail,
        password: user.getPassword,

        profile: {
          create: {
            shortBio: profile.getShortBio,
            avatar: profile.getAvatar,
            gender: profile.getGender,
            language: profile.getLanguage,
          },
        },
      },
      include: { profile: true },
    });
    const userDomain: User = UserMapper.toDomainEntity(newUser);

    return userDomain;
  }

  public async update(user: User): Promise<User> {
    const profile = user.getProfile;

    const updateUser: PrismaUserAggregate = await this.user.update({
      where: { id: user.getId },
      data: {
        name: user.getName,
        email: user.getEmail,
        password: user.getPassword,
        verified: user.getVerified,

        profile: {
          update: {
            shortBio: profile.getShortBio,
            avatar: profile.getAvatar,
            gender: profile.getGender,
            language: profile.getLanguage,
          },
        },
      },
      include: { profile: true },
    });
    const userDomain: User = UserMapper.toDomainEntity(updateUser);

    return userDomain;
  }

  public async remove(user: User): Promise<void> {
    await this.user.delete({ where: { id: user.getId } });
    await this.deletedUser.create({
      data: {
        id: user.getId,
        email: user.getEmail,
        disabled: false,

        // Connect profile
        profile: { connect: { id: user.getProfile.getId } },
      },
    });
  }

  /**
   * Profile ID는 autoincrement로 설계, 영속성을 위해 DB 조회 필요
   *
   * - 발급에 실패하면 Profile ID는 0으로 초기화.
   */
  public async generateProfileId(): Promise<number> {
    let profileId = 0;

    const findLatestProfile = await this.profile.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    if (findLatestProfile) {
      // 만약 1을 안 더하면 ID가 중복이 되므로 정확한 식별 불가
      profileId = findLatestProfile.id + 1;
    }

    return profileId;
  }
}
