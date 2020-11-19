import { Profile as PrismaProfile } from '@prisma/client';
import { Profile, Gender, Language } from '@core/domain/profile/entity/Profile';

export class ProfileMapper {
  public static toOrmEntity(profileDomain: Profile): PrismaProfile {
    const profileOrm: PrismaProfile = {
      id: profileDomain.getId,
      userId: profileDomain.getUserId,
      shortBio: profileDomain.getShortBio,
      avatar: profileDomain.getAvatar,
      gender: profileDomain.getGender,
      language: profileDomain.getLanguage,
    };

    return profileOrm;
  }

  public static toOrmEntities(profilesDomain: Profile[]): PrismaProfile[] {
    return profilesDomain.map(profileOrm => this.toOrmEntity(profileOrm));
  }

  public static toDomainEntity(profileOrm: PrismaProfile): Profile {
    const profileDomain: Profile = new Profile({
      id: profileOrm.id,
      userId: profileOrm.userId,
      shortBio: profileOrm.shortBio as string,
      avatar: profileOrm.avatar as string,
      gender: profileOrm.gender as Gender,
      language: profileOrm.language as Language,
    });

    return profileDomain;
  }

  public static toDomainEntities(profilesOrm: PrismaProfile[]): Profile[] {
    return profilesOrm.map(profileOrm => this.toDomainEntity(profileOrm));
  }
}
