import { IsInt, IsBoolean, IsDate, IsUUID, IsOptional } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateHistoryItemEntityPayload } from '@core/domain/history/entity/type/CreateHistoryItemEntityPayload';

export class HistoryItem extends Entity<string> {
  @IsUUID()
  private readonly mediaId: string;

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

  public constructor(payload: CreateHistoryItemEntityPayload) {
    super();

    this.mediaId = payload.mediaId;

    this.id = payload.id ?? v4();
    this.repeat = payload.repeat ?? 0;
    this.private = payload.private ?? false;
    this.completedAt = payload.completedAt ?? new Date();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryItemEntityPayload): Promise<HistoryItem> {
    const historyItem = new HistoryItem(payload);
    await historyItem.validate();

    return historyItem;
  }

  public get getMediaId(): string {
    return this.mediaId;
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
}
