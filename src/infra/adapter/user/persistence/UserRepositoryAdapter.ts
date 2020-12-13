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

  public async create(user: User): Promise<void> {
    const profile = user.getProfile;

    await this.user.create({
      data: {
        id: user.getId,
        name: user.getName,
        email: user.getEmail,
        password: user.getPassword,
        verified: user.getVerified,
        role: user.getRole,

        profile: {
          create: {
            shortBio: profile.getShortBio,
            avatar: profile.getAvatar,
            gender: profile.getGender,
            language: profile.getLanguage,
          },
        },
      },
    });
  }

  public async update(user: User): Promise<void> {
    const profile = user.getProfile;

    await this.user.update({
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
    });
  }

  public async remove(user: User): Promise<void> {
    const deleteUser = await this.user.delete({ where: { id: user.getId } });

    await this.deletedUser.create({
      data: {
        id: user.getId,
        email: user.getEmail,
        disabled: false,
        deletedAt: new Date(),

        // Connect
        profile: { connect: { id: deleteUser.profileId } },
      },
    });
  }
}
