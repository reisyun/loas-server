import { User as PrismaUser } from '@prisma/client';
import { User, UserRole } from '@core/domain/user/entity/User';

export class UserMapper {
  public static toOrmEntity(userDomain: User): PrismaUser {
    const userOrm: PrismaUser = {
      id: userDomain.getId,
      name: userDomain.getName,
      email: userDomain.getEmail,
      password: userDomain.getPassword,
      verified: userDomain.getVerified,
      role: userDomain.getRole,
      createdAt: userDomain.getCreatedAt,
      updatedAt: userDomain.getUpdatedAt as Date,
      removedAt: userDomain.getRemovedAt as Date,
    };

    return userOrm;
  }

  public static toOrmEntities(usersDomain: User[]): PrismaUser[] {
    return usersDomain.map(userDomain => this.toOrmEntity(userDomain));
  }

  public static toDomainEntity(userOrm: PrismaUser): User {
    const userDomain: User = new User({
      id: userOrm.id,
      name: userOrm.name,
      email: userOrm.email,
      password: userOrm.password,
      verified: userOrm.verified,
      role: userOrm.role as UserRole,
      createdAt: userOrm.createdAt,
      updatedAt: userOrm.updatedAt,
      removedAt: userOrm.removedAt as Date,
    });

    return userDomain;
  }

  public static toDomainEntities(userOrms: PrismaUser[]): User[] {
    return userOrms.map(userOrm => this.toDomainEntity(userOrm));
  }
}
