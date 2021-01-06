import { IsInt, IsBoolean, IsDate, IsOptional, IsInstance } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/Types';
import { CreateHistoryItemEntityPayload } from '@core/domain/history/entity/type/CreateHistoryItemEntityPayload';

import { Media, MediaStatus } from '@core/domain/history/value-object/Media';

export class HistoryItem extends Entity<string> {
  @IsInstance(Media)
  private readonly media: Media;

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
    media: Media,
    repeat?: number,
    isPrivate?: boolean,
    completedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    removedAt?: Date,
    id?: string,
  ) {
    super();

    this.media = media;

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
      payload.media,
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

  public get getMedia(): Media {
    return this.media;
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

  public async update(): Promise<void> {
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
    return this.getMedia.getId === mediaId;
  }

  public async addToCompleteCategory(): Promise<void> {
    const addableMediaStatus = this.media.getStatus === MediaStatus.FINISHED;

    if (!addableMediaStatus) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Only finished media can be added to COMPLETED category',
      });
    }
  }

  public async addToCurrentCategory(): Promise<void> {
    const addableMediaStatus =
      this.media.getStatus === MediaStatus.FINISHED ||
      this.media.getStatus === MediaStatus.RELEASING;

    if (!addableMediaStatus) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Only finished or releasing media can be added to CURRENT category',
      });
    }
  }
}
