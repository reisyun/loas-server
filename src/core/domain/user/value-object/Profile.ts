import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Nullable } from '@core/common/Types';
import { ValueObject } from '@core/common/ValueObject';
import { Gender, Language } from '@core/common/enums/UserEnums';
import { CreateProfileValueObjectPayload } from '@core/domain/user/value-object/type/CreateProfileValueObjectPayload';

export class Profile extends ValueObject {
  @IsString()
  @IsOptional()
  private readonly shortBio: Nullable<string>;

  @IsString()
  @IsOptional()
  private readonly avatar: Nullable<string>;

  @IsEnum(Gender)
  private readonly gender: Gender;

  @IsEnum(Language)
  private readonly language: Language;

  public constructor(payload?: CreateProfileValueObjectPayload) {
    super();

    this.shortBio = payload?.shortBio ?? null;
    this.avatar = payload?.avatar ?? null;
    this.gender = payload?.gender ?? Gender.SECRET;
    this.language = payload?.language ?? Language.KOREAN;
  }

  public static async new(payload?: CreateProfileValueObjectPayload): Promise<Profile> {
    const profile = new Profile(payload);
    await profile.validate();

    return profile;
  }

  public get getShortBio(): Nullable<string> {
    return this.shortBio;
  }

  public get getAvatar(): Nullable<string> {
    return this.avatar;
  }

  public get getGender(): Gender {
    return this.gender;
  }

  public get getLanguage(): Language {
    return this.language;
  }
}
