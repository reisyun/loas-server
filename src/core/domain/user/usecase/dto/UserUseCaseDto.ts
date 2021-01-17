import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { UserRole, Gender, Language } from '@core/common/enums/UserEnums';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';

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
  public profile!: {
    shortBio: Nullable<string>;
    avatar: Nullable<string>;
    gender: Gender;
    language: Language;
  };

  public role!: UserRole;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  public static newFromUser(user: User): UserUseCaseDto {
    const dto: UserUseCaseDto = plainToClass(UserUseCaseDto, user);
    const profile: Profile = user.getProfile;

    dto.profile = {
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
