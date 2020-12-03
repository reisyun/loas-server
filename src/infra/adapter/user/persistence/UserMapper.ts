import { User as PrismaUser, Profile as PrismaProfile } from '@prisma/client';
import { User, UserRole } from '@core/domain/user/entity/User';
import { Profile, Gender, Language } from '@core/domain/user/entity/Profile';

export interface PrismaUserAggregate extends PrismaUser {
  profile: PrismaProfile;
}

export class UserMapper {
  public static toOrmEntity(domain: User): PrismaUserAggregate {
    const orm: PrismaUserAggregate = {
      id: domain.getId,
      name: domain.getName,
      email: domain.getEmail,
      password: domain.getPassword,
      verified: domain.getVerified,
      role: domain.getRole,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,

      profileId: domain.getProfile.getId,
      profile: {
        id: domain.getProfile.getId,
        shortBio: domain.getProfile.getShortBio,
        avatar: domain.getProfile.getAvatar,
        gender: domain.getProfile.getGender,
        language: domain.getProfile.getLanguage,
      },
    };

    return orm;
  }

  public static toOrmEntities(domains: User[]): PrismaUserAggregate[] {
    return domains.map(domain => this.toOrmEntity(domain));
  }

  public static toDomainEntity(orm: PrismaUserAggregate): User {
    const domain: User = new User({
      id: orm.id,
      name: orm.name,
      email: orm.email,
      password: orm.password,
      verified: orm.verified,
      role: orm.role as UserRole,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,

      // Sub domain
      profile: new Profile(
        orm.profile.id,
        orm.profile.shortBio as string,
        orm.profile.avatar as string,
        orm.profile.gender as Gender,
        orm.profile.language as Language,
      ),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaUserAggregate[]): User[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
