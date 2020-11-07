import { Profile as PrismaProfile } from '@prisma/client';
import { Profile, Gender, Language } from '@core/domain/profile/entity/Profile';

/**
 * Domain Model 또는 ORM Model을 매핑해 서로 호환되도록 도움
 * - Profile 엔티티 <--> Prisma 객체
 */
export class ProfileMapper {
  /**
   * Profile 엔티티 -> Prisma 객체
   */
  public static toOrmEntity(profileDomain: Profile): PrismaProfile {
    const profileOrm: PrismaProfile = {
      id: profileDomain.getId,
      userId: profileDomain.getUserId,
      gender: profileDomain.getGender,
      language: profileDomain.getLanguage,
      shortBio: profileDomain.getShortBio,
      avatar: profileDomain.getAvatar,
    };

    return profileOrm;
  }

  public static toOrmEntities(profilesDomain: Profile[]): PrismaProfile[] {
    return profilesDomain.map(profileOrm => this.toOrmEntity(profileOrm));
  }

  /**
   * Prisma 객체 -> Profile 엔티티
   */
  public static toDomainEntity(profileOrm: PrismaProfile): Profile {
    const profileDomain: Profile = new Profile({
      id: profileOrm.id,
      userId: profileOrm.userId,
      gender: profileOrm.gender as Gender,
      language: profileOrm.language as Language,
      shortBio: profileOrm.shortBio as string,
      avatar: profileOrm.avatar as string,
    });

    return profileDomain;
  }

  public static toDomainEntities(profilesOrm: PrismaProfile[]): Profile[] {
    return profilesOrm.map(profileOrm => this.toDomainEntity(profileOrm));
  }
}
