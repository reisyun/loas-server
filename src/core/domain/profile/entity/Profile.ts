import { IsUUID, IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
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

  @IsString()
  @IsOptional()
  private shortBio: Nullable<string>;

  @IsOptional()
  @IsString()
  private avatar: Nullable<string>;

  @IsEnum(Gender)
  private gender: Gender;

  @IsEnum(Language)
  private language: Language;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateProfileEntityPayload) {
    super();

    this.userId = payload.userId;
    this.id = payload.id;

    this.shortBio = payload.shortBio ?? null;
    this.avatar = payload.avatar ?? null;
    this.gender = payload.gender ?? Gender.SECRET;
    this.language = payload.language ?? Language.KOREAN;
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
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

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public get getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public async edit(payload: EditProfileEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.shortBio) {
      this.shortBio = payload.shortBio;
      this.updatedAt = currentDate;
    }
    if (payload.avatar) {
      this.avatar = payload.avatar;
      this.updatedAt = currentDate;
    }
    if (payload.gender) {
      this.gender = payload.gender;
      this.updatedAt = currentDate;
    }
    if (payload.language) {
      this.language = payload.language;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
}
