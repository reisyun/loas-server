import { IsDate, IsEnum, IsInstance, IsOptional } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';

export enum Category {
  PLANNING = 'PLANNING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export class History extends Entity<string> {
  @IsInstance(HistoryOwner)
  private readonly owner: HistoryOwner;

  @IsEnum(Category)
  private category: Category;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.owner = payload.owner;
    this.category = payload.category;

    this.id = payload.id ?? v4();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getOwner(): HistoryOwner {
    return this.owner;
  }

  public get getCategory(): Category {
    return this.category;
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
