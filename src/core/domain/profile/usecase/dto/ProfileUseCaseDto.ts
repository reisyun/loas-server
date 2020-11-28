import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Profile, Gender, Language } from '@core/domain/profile/entity/Profile';

@Exclude()
export class ProfileUseCaseDto {
  @Expose()
  public id!: number;

  @Expose()
  public userId!: string;

  @Expose()
  public shortBio?: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public gender!: Gender;

  @Expose()
  public language!: Language;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;

  public static newFromProfile(profile: Profile): ProfileUseCaseDto {
    const dto: ProfileUseCaseDto = plainToClass(ProfileUseCaseDto, profile);
    return dto;
  }

  public static newListFromProfiles(profiles: Profile[]): ProfileUseCaseDto[] {
    return profiles.map(profile => this.newFromProfile(profile));
  }
}
