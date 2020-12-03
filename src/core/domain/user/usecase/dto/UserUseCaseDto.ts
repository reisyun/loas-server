import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { User, UserRole } from '@core/domain/user/entity/User';
import { Profile, Gender, Language } from '@core/domain/user/entity/Profile';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public verified!: boolean;

  @Expose()
  public role!: UserRole;

  public createdAt!: Date;

  public updatedAt!: Date;

  @Expose()
  public profile!: {
    id: number;
    shortBio: Nullable<string>;
    avatar: Nullable<string>;
    gender: Gender;
    language: Language;
  };

  public static newFromUser(user: User): UserUseCaseDto {
    const dto: UserUseCaseDto = plainToClass(UserUseCaseDto, user);
    const profile: Profile = user.getProfile;

    dto.profile = {
      id: profile.getId,
      shortBio: profile.getShortBio,
      avatar: profile.getAvatar,
      gender: profile.getGender,
      language: profile.getLanguage,
    };

    return dto;
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map(user => this.newFromUser(user));
  }
}
