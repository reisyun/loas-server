import {
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsDate,
  IsOptional,
  MinLength,
} from 'class-validator';
import { compare, genSalt, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { EditUserEntityPayload } from '@core/domain/user/entity/type/EditUserEntityPayload';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User extends Entity<string> {
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

  @IsOptional()
  @IsDate()
  private updatedAt: Date;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateUserEntityPayload) {
    super();

    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;

    this.id = payload.id || v4();
    this.role = payload.role || UserRole.USER;
    this.verified = payload.verified || false;
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || new Date();
    this.removedAt = payload.removedAt || null;
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  private async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
