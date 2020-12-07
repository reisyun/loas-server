import {
  IsString,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInstance,
  MinLength,
} from 'class-validator';
import { compare, genSalt, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { EditUserEntityPayload } from '@core/domain/user/entity/type/EditUserEntityPayload';
import { Profile } from '@core/domain/user/value-object/Profile';
import { CreateProfileValueObjectPayload } from '@core/domain/user/value-object/type/CreateProfileValueObjectPayload';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User extends Entity<string> {
  @IsInstance(Profile)
  private profile: Profile;

  @IsString()
  private name: string;

  @IsEmail()
  private email: string;

  @IsString()
  @MinLength(6)
  private password: string;

  @IsBoolean()
  private verified: boolean;

  @IsEnum(UserRole)
  private readonly role: UserRole;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  public constructor(payload: CreateUserEntityPayload) {
    super();

    this.profile = payload.profile;
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;

    this.id = payload.id ?? v4();
    this.role = payload.role ?? UserRole.USER;
    this.verified = payload.verified ?? false;
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }

  public get getProfile(): Profile {
    return this.profile;
  }

  public get getName(): string {
    return this.name;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getRole(): UserRole {
    return this.role;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getVerified(): boolean {
    return this.verified;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(payload: EditUserEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.name) {
      this.name = payload.name;
      this.updatedAt = currentDate;
    }
    if (payload.email) {
      this.email = payload.email;
      this.updatedAt = currentDate;
    }
    if (payload.password) {
      this.password = payload.password;
      this.updatedAt = currentDate;
    }
    if (payload.verified) {
      this.verified = payload.verified;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async editProfile(payload: CreateProfileValueObjectPayload): Promise<void> {
    const currentDate: Date = new Date();

    // 빈 객체가 아닐 경우
    if (Object.keys(payload).length !== 0) {
      const newProfile: Profile = await Profile.new({
        shortBio: payload.shortBio ?? (this.getProfile.getShortBio as string),
        avatar: payload.avatar ?? (this.getProfile.getAvatar as string),
        gender: payload.gender ?? this.getProfile.getGender,
        language: payload.language ?? this.getProfile.getLanguage,
      });

      this.profile = newProfile;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  private async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }
}
