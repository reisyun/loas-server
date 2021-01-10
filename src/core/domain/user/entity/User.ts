import {
  IsString,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInstance,
  MinLength,
} from 'class-validator';
import { compare, genSalt, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { Nullable } from '@core/common/Types';
import { Entity } from '@core/common/Entity';
import { UserRole } from '@core/common/enums/UserEnums';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { EditUserEntityPayload } from '@core/domain/user/entity/type/EditUserEntityPayload';
import { Profile } from '@core/domain/user/value-object/Profile';
import { CreateProfileValueObjectPayload } from '@core/domain/user/value-object/type/CreateProfileValueObjectPayload';


export class User extends Entity<string> {
  @IsString()
  private name: string;

  @IsEmail()
  private email: string;

  @IsBoolean()
  private verified: boolean;

  @IsString()
  @MinLength(6)
  private password: string;

  @IsInstance(Profile)
  private profile: Profile;

  @IsEnum(UserRole)
  private readonly role: UserRole;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateUserEntityPayload) {
    super();

    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
    this.profile = payload.profile;

    this.id = payload.id ?? v4();
    this.verified = payload.verified ?? false;
    this.role = payload.role ?? UserRole.USER;
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }

  public get getName(): string {
    return this.name;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getVerified(): boolean {
    return this.verified;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getProfile(): Profile {
    return this.profile;
  }

  public get getRole(): UserRole {
    return this.role;
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
    if (payload.verified) {
      this.verified = payload.verified;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async editProfile(payload: CreateProfileValueObjectPayload): Promise<void> {
    if (Object.keys(payload).length === 0) {
      return;
    }

    const currentDate: Date = new Date();
    const prevProfile = this.profile;

    const newProfile: Profile = await Profile.new({
      shortBio: payload.shortBio ?? (prevProfile.getShortBio as string),
      avatar: payload.avatar ?? (prevProfile.getAvatar as string),
      gender: payload.gender ?? prevProfile.getGender,
      language: payload.language ?? prevProfile.getLanguage,
    });

    this.profile = newProfile;
    this.updatedAt = currentDate;

    await this.validate();
  }

  public async changePassword(password: string): Promise<void> {
    const currentDate: Date = new Date();

    this.password = password;
    this.updatedAt = currentDate;

    await this.hashPassword();
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
