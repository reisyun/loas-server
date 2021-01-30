import { IsInt, IsBoolean, IsDate, IsUUID, IsEnum, IsArray, IsOptional } from 'class-validator';
import { v4 } from 'uuid';
import { Nullable } from '@core/common/Types';
import { Entity } from '@core/common/Entity';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';
import { EditHistoryEntityPayload } from '@core/domain/history/entity/type/EditHistoryEntityPayload';

export class History extends Entity<string> {
  @IsArray()
  @IsEnum(HistoryCategory)
  private categories: HistoryCategory[];

  @IsUUID()
  private mediaId: string;

  @IsInt()
  private repeat: number;

  @IsBoolean()
  private private: boolean;

  @IsDate()
  private completedAt: Date;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.mediaId = payload.mediaId;
    this.categories = payload.categories;

    this.id = payload.id ?? v4();
    this.repeat = payload.repeat ?? 0;
    this.private = payload.private ?? false;
    this.completedAt = payload.completedAt ?? new Date();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getMediaId(): string {
    return this.mediaId;
  }

  public get getCategories(): HistoryCategory[] {
    return this.categories;
  }

  public get getRepeat(): number {
    return this.repeat;
  }

  public get getPrivate(): boolean {
    return this.private;
  }

  public get getCompletedAt(): Date {
    return this.completedAt;
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

  public async edit(payload: EditHistoryEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.repeat) {
      this.repeat = payload.repeat;
      this.updatedAt = currentDate;
    }
    if (payload.private) {
      this.private = payload.private;
      this.updatedAt = currentDate;
    }
    if (payload.completedAt) {
      this.completedAt = payload.completedAt;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async addCategory(category: HistoryCategory) {
    const exists = this.categories.some(c => c === category);
    if (!exists) {
      this.categories = [...this.categories, category];
    }
  }

  public async removeCategory(category: HistoryCategory) {
    const newCategories = this.categories.filter(c => c === category);
    this.categories = newCategories;
  }
}
