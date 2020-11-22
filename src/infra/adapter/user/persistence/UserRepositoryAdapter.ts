import { User as PrismaUser } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { User } from '@core/domain/user/entity/User';
import {
  UserRepositoryPort,
  UserWhereInput,
} from '@core/domain/user/port/persistence/UserRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { UserMapper } from '@infra/adapter/user/persistence/UserMapper';

export class UserRepositoryAdapter extends PrismaRepository implements UserRepositoryPort {
  public async findOne(where: UserWhereInput): Promise<Nullable<User>> {
    let userDomain: Nullable<User> = null;
    const user: Nullable<PrismaUser> = await this.user.findOne({ where });
    if (user) {
      userDomain = UserMapper.toDomainEntity(user);
    }

    return userDomain;
  }

  public async findMany(
    where?: UserWhereInput & { name?: string },
    options?: RepositoryFindManyOptions<string>,
  ): Promise<User[]> {
    const users: Nullable<PrismaUser[]> = await this.user.findMany({ where, ...options });
    const usersDomain: User[] = UserMapper.toDomainEntities(users);

    return usersDomain;
  }

  public async count(
    where?: UserWhereInput,
    options?: RepositoryFindManyOptions<string>,
  ): Promise<number> {
    const countUser: number = await this.user.count({ where, ...options });

    return countUser;
  }

  public async create(user: User): Promise<User> {
    const newUser: PrismaUser = await this.user.create({
      data: {
        id: user.getId,
        email: user.getEmail,
        name: user.getName,
        password: user.getPassword,
      },
    });
    const userDomain: User = UserMapper.toDomainEntity(newUser);

    return userDomain;
  }

  public async update(user: User): Promise<User> {
    const userOrm: PrismaUser = UserMapper.toOrmEntity(user);
    const updateUser: PrismaUser = await this.user.update({
      where: { id: userOrm.id },
      data: userOrm,
    });
    const userDomain: User = UserMapper.toDomainEntity(updateUser);

    return userDomain;
  }
}
