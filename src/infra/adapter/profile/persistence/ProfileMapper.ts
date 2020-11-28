import { Profile as PrismaProfile } from '@prisma/client';
import { Profile, Gender, Language } from '@core/domain/profile/entity/Profile';

export class ProfileMapper {
  public static toOrmEntity(domain: Profile): PrismaProfile {
    const orm: PrismaProfile = {
      id: domain.getId,
      userId: domain.getUserId,
      deletedUserId: domain.getUserId,
      shortBio: domain.getShortBio,
      avatar: domain.getAvatar,
      gender: domain.getGender,
      language: domain.getLanguage,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,
      removedAt: domain.getRemovedAt,
    };

    return orm;
  }

  public static toOrmEntities(domains: Profile[]): PrismaProfile[] {
    return domains.map(orm => this.toOrmEntity(orm));
  }

  public static toDomainEntity(orm: PrismaProfile): Profile {
    const domain: Profile = new Profile({
      id: orm.id,
      userId: orm.userId as string,
      shortBio: orm.shortBio as string,
      avatar: orm.avatar as string,
      gender: orm.gender as Gender,
      language: orm.language as Language,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaProfile[]): Profile[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
