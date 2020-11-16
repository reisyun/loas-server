import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateProfileEntityPayload } from '@core/domain/profile/entity/type/CreateProfileEntityPayload';
import { EditProfileEntityPayload } from '@core/domain/profile/entity/type/EditProfileEntityPayload';

export enum Gender {
  SECRET = 'SECRET',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Language {
  KOREAN = 'KOREAN',
  ENGLISH = 'ENGLISH',
  JAPANESE = 'JAPANESE',
}

export class Profile extends Entity<number> {
  @IsUUID()
  private readonly userId: string;

  @IsOptional()
  @IsString()
  private shortBio: Nullable<string>;

  @IsOptional()
  @IsString()
  private avatar: Nullable<string>;

  @IsEnum(Gender)
  private gender: Gender;

  @IsEnum(Language)
  private language: Language;

  public constructor(payload: CreateProfileEntityPayload) {
    super();

    this.userId = payload.userId;
    this.shortBio = payload.shortBio ?? null;
    this.avatar = payload.avatar ?? null;
    this.gender = payload.gender ?? Gender.SECRET;
    this.language = payload.language ?? Language.KOREAN;

    this.id = payload.id;
  }

  public static async new(payload: CreateProfileEntityPayload): Promise<Profile> {
    const profile = new Profile(payload);
    await profile.validate();

    return profile;
  }

  public get getUserId(): string {
    return this.userId;
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

  public async edit(payload: EditProfileEntityPayload): Promise<void> {
    if (payload.shortBio) {
      this.shortBio = payload.shortBio;
    }
    if (payload.avatar) {
      this.avatar = payload.avatar;
    }
    if (payload.gender) {
      this.gender = payload.gender;
    }
    if (payload.language) {
      this.language = payload.language;
    }

    await this.validate();
  }
}
