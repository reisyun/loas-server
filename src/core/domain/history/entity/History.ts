import { IsDate, IsUUID, IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';
import { HistoryItem } from '@core/domain/history/value-object/HistoryItem';

export enum HistoryCategory {
  PLANNING = 'PLANNING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export class History extends Entity<string> {
  @IsUUID()
  private readonly ownerId: string;

  @IsEnum(HistoryCategory)
  private category: HistoryCategory;

  @IsArray()
  @ValidateNested({ each: true })
  private historyItems: Array<HistoryItem>;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.ownerId = payload.ownerId;
    this.category = payload.category;

    this.id = payload.id ?? v4();
    this.historyItems = payload.historyItems ?? [];
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getOwnerId(): string {
    return this.ownerId;
  }

  public get getCategory(): HistoryCategory {
    return this.category;
  }

  public get getHistoryItems(): Array<HistoryItem> {
    return this.historyItems;
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

  public async restore(): Promise<void> {
    this.removedAt = null;
    await this.validate();
  }
}
