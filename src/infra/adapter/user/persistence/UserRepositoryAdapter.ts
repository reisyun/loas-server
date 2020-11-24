import { User as PrismaUser } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { UserRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { UserMapper } from '@infra/adapter/user/persistence/UserMapper';

export class UserRepositoryAdapter extends PrismaRepository implements UserRepositoryPort {
  public async findOne(args: UserRepositoryArgs.FindOne): Promise<Nullable<User>> {
    let userDomain: Nullable<User> = null;
    const user: Nullable<PrismaUser> = await this.user.findOne(args);
    if (user) {
      userDomain = UserMapper.toDomainEntity(user);
    }

    return userDomain;
  }

  public async findMany(args?: UserRepositoryArgs.FindMany): Promise<User[]> {
    const users: Nullable<PrismaUser[]> = await this.user.findMany(args);
    const usersDomain: User[] = UserMapper.toDomainEntities(users);

    return usersDomain;
  }

  public async count(args?: UserRepositoryArgs.FindMany): Promise<number> {
    const countUser: number = await this.user.count(args);

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
    const updateUser: PrismaUser = await this.user.update({
      where: { id: user.getId },
      data: {
        name: user.getName,
        email: user.getEmail,
        password: user.getPassword,
        verified: user.getVerified,
        // soft delete
        removedAt: user.getRemovedAt,
      },
    });
    const userDomain: User = UserMapper.toDomainEntity(updateUser);

    return userDomain;
  }

  public async remove(user: User): Promise<User> {
    const removeUser: PrismaUser = await this.user.delete({
      where: { id: user.getId },
    });
    const userDomain: User = UserMapper.toDomainEntity(removeUser);

    return userDomain;
  }
}
