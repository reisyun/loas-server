import { IsString, IsBoolean, IsDate, IsOptional, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateLibraryEntityPayload } from '@core/domain/library/entity/type/CreateLibraryEntityPayload';

export class Library extends Entity<string> {
  @IsUUID()
  private readonly userId: string;

  @IsString()
  private name: string;

  @IsOptional()
  @IsString()
  private description: Nullable<string>;

  @IsBoolean()
  private private: boolean;

  @IsBoolean()
  private isCustom: boolean;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateLibraryEntityPayload) {
    super();

    this.userId = payload.userId;
    this.name = payload.name;

    this.id = payload.id ?? v4();
    this.description = payload.description ?? null;
    this.private = payload.private ?? false;
    this.isCustom = payload.isCustom ?? true;
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateLibraryEntityPayload): Promise<Library> {
    const library = new Library(payload);
    await library.validate();

    return library;
  }

  public get getUserId(): string {
    return this.userId;
  }

  public get getName(): string {
    return this.name;
  }

  public get getDescription(): Nullable<string> {
    return this.description;
  }

  public get getPrivate(): boolean {
    return this.private;
  }

  public get getIsCustom(): boolean {
    return this.isCustom;
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
}
