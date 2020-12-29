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

  public constructor(
    mediaId: string,
    repeat?: number,
    isPrivate?: boolean,
    completedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    removedAt?: Date,
    id?: string,
  ) {
    super();

    this.mediaId = mediaId;

    this.id = id ?? v4();
    this.repeat = repeat ?? 0;
    this.private = isPrivate ?? false;
    this.completedAt = completedAt ?? new Date();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.removedAt = removedAt ?? null;
  }

  public static async new(payload: CreateHistoryItemEntityPayload): Promise<HistoryItem> {
    const historyItem = new HistoryItem(
      payload.mediaId,
      payload.repeat,
      payload.private,
      payload.completedAt,
      payload.createdAt,
      payload.updatedAt,
      payload.removedAt,
      payload.id,
    );
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

  public async update() {
    this.updatedAt = new Date();
    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async increaseRepeat(): Promise<void> {
    this.repeat += 1;
    await this.validate();
  }

  public verifySameMediaExist(mediaId: string): boolean {
    return this.getMediaId === mediaId;
  }
}
