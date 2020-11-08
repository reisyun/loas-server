import { User as PrismaUser } from '@prisma/client';
import { User, UserRole } from '@core/domain/user/entity/User';

/**
 * Domain Model 또는 ORM Model을 매핑해 서로 호환되도록 도움
 * - User 엔티티 <--> Prisma 객체
 */
export class UserMapper {
  /**
   * User 엔티티 -> Prisma 객체
   */
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

  /**
   * Prisma 객체 -> User 엔티티
   */
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
