import { Profile as PrismaProfile } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { Profile } from '@core/domain/profile/entity/Profile';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { ProfileMapper } from '@infra/adapter/profile/persistence/ProfileMapper';
import {
  ProfileRepositoryPort,
  ProfileWhereInput,
} from '@core/domain/profile/port/persistence/ProfileRepositoryPort';

export class ProfileRepositoryAdapter extends PrismaRepository implements ProfileRepositoryPort {
  public async findOne(where: ProfileWhereInput): Promise<Nullable<Profile>> {
    let profileDomain: Nullable<Profile> = null;
    const profile: Nullable<PrismaProfile> = await this.profile.findOne({ where });
    if (profile) {
      profileDomain = ProfileMapper.toDomainEntity(profile);
    }

    return profileDomain;
  }

  public async findMany(
    where?: ProfileWhereInput,
    options?: RepositoryFindManyOptions<number>,
  ): Promise<Profile[]> {
    const profiles: Nullable<PrismaProfile[]> = await this.profile.findMany({ where, ...options });
    const profilesDomain: Profile[] = ProfileMapper.toDomainEntities(profiles);

    return profilesDomain;
  }

  public async count(
    where?: ProfileWhereInput,
    options?: RepositoryFindManyOptions<number>,
  ): Promise<number> {
    const countProfile: number = await this.profile.count({ where, ...options });

    return countProfile;
  }

  public async create(userId: string, profile: Profile): Promise<Profile> {
    const profileOrm: PrismaProfile = ProfileMapper.toOrmEntity(profile);
    const newProfile: PrismaProfile = await this.profile.create({
      data: {
        user: { connect: { id: userId } },
        shortBio: profileOrm.shortBio,
        avatar: profileOrm.avatar,
        gender: profileOrm.gender,
        language: profileOrm.language,
      },
    });
    const profileDomain: Profile = ProfileMapper.toDomainEntity(newProfile);

    return profileDomain;
  }

  public async update(profile: Profile): Promise<Profile> {
    const profileOrm: PrismaProfile = ProfileMapper.toOrmEntity(profile);
    const updateProfile: PrismaProfile = await this.profile.update({
      where: { id: profileOrm.id },
      data: {
        shortBio: profileOrm.shortBio,
        avatar: profileOrm.avatar,
        gender: profileOrm.gender,
        language: profileOrm.language,
      },
    });
    const profileDomain: Profile = ProfileMapper.toDomainEntity(updateProfile);

    return profileDomain;
  }
}
