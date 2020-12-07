import { User as PrismaUser, Profile as PrismaProfile } from '@prisma/client';
import { User, UserRole } from '@core/domain/user/entity/User';
import { Profile, Gender, Language } from '@core/domain/user/value-object/Profile';

export interface PrismaUserAggregate extends PrismaUser {
  profile: PrismaProfile;
}

export class UserMapper {
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
      profile: new Profile({
        shortBio: orm.profile.shortBio as string,
        avatar: orm.profile.avatar as string,
        gender: orm.profile.gender as Gender,
        language: orm.profile.language as Language,
      }),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaUserAggregate[]): User[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
