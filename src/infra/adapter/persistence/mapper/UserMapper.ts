import { UserRole, Gender, Language } from '@core/common/enums/UserEnums';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { PrismaUser } from '@infra/adapter/persistence/entity/PrismaUser';

export class UserMapper {
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

      // Sub domain
      profile: new Profile({
        shortBio: orm.profile?.shortBio as string,
        avatar: orm.profile?.avatar as string,
        gender: orm.profile?.gender as Gender,
        language: orm.profile?.language as Language,
      }),
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaUser[]): User[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
