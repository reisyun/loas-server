import { IsString, IsBoolean, IsDate, IsOptional, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';
import { EditCollectionEntityPayload } from '@core/domain/collection/entity/type/EditCollectionEntityPayload';

export class Collection extends Entity<string> {
  @IsUUID()
  private readonly userId: string;

  @IsString()
  private name: string;

  @IsString()
  @IsOptional()
  private description: Nullable<string>;

  @IsBoolean()
  private isCustom: boolean;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateCollectionEntityPayload) {
    super();

    this.userId = payload.userId;
    this.name = payload.name;

    this.id = payload.id ?? v4();
    this.description = payload.description ?? null;
    this.isCustom = payload.isCustom ?? true;
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateCollectionEntityPayload): Promise<Collection> {
    const collection = new Collection(payload);
    await collection.validate();

    return collection;
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

  public async edit(payload: EditCollectionEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.name) {
      this.name = payload.name;
      this.updatedAt = currentDate;
    }
    if (payload.description) {
      this.description = payload.description;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async restore(): Promise<void> {
    this.removedAt = null;
    await this.validate();
  }
}
