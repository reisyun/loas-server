import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Nullable } from '@core/common/Types';
import { Entity } from '@core/common/Entity';

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

export type CreateProfileEntityPayload = {
  id: number;
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
};

export type EditProfileEntityPayload = {
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
};

export class Profile extends Entity<number> {
  @IsString()
  @IsOptional()
  private shortBio: Nullable<string>;

  @IsString()
  @IsOptional()
  private avatar: Nullable<string>;

  @IsEnum(Gender)
  private gender: Gender;

  @IsEnum(Language)
  private language: Language;

  // User Entity 내부에 Profile을 생성 시 param을 object로 넘겨 받으면 밑의 에러가 발생함
  // TypeError: Cannot read property 'id' of undefined
  // TODO: 더 좋은 방법이 있는지 찾기
  public constructor(
    id: number,
    shortBio?: string,
    avatar?: string,
    gender?: Gender,
    language?: Language,
  ) {
    super();

    this.id = id;
    this.shortBio = shortBio ?? null;
    this.avatar = avatar ?? null;
    this.gender = gender ?? Gender.SECRET;
    this.language = language ?? Language.KOREAN;
  }

  public static async new(payload: CreateProfileEntityPayload): Promise<Profile> {
    const profile = new Profile(
      payload.id,
      payload.shortBio,
      payload.avatar,
      payload.gender,
      payload.language,
    );
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

  public async edit(payload: EditProfileEntityPayload): Promise<Profile> {
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

    return this;
  }
}
