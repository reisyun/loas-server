import { User as PrismaUser } from '@prisma/client';
import { User, UserRole } from '@core/domain/user/entity/User';

export class UserMapper {
  public static toOrmEntity(domain: User): PrismaUser {
    const orm: PrismaUser = {
      id: domain.getId,
      name: domain.getName,
      email: domain.getEmail,
      password: domain.getPassword,
      verified: domain.getVerified,
      role: domain.getRole,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,
      removedAt: domain.getRemovedAt,
    };

    return orm;
  }

  public static toOrmEntities(domains: User[]): PrismaUser[] {
    return domains.map(domain => this.toOrmEntity(domain));
  }

  public static toDomainEntity(orm: PrismaUser): User {
    const domain: User = new User({
      id: orm.id,
      name: orm.name,
      email: orm.email,
      password: orm.password,
      verified: orm.verified,
      role: orm.role as UserRole,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaUser[]): User[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
