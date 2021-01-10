import { IsInt, IsBoolean, IsDate, IsOptional, IsInstance } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/Types';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { MediaStatus } from '@core/common/enums/MediaEnums';
import { CreateHistoryItemEntityPayload } from '@core/domain/historyItem/entity/type/CreateHistoryItemEntityPayload';

import { History } from '@core/domain/historyItem/value-object/History';
import { Media } from '@core/domain/historyItem/value-object/Media';

export class HistoryItem extends Entity<string> {
  @IsInstance(History)
  private readonly history: History;

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

  public constructor(payload: CreateHistoryItemEntityPayload) {
    super();

    this.history = payload.history;
    this.media = payload.media;

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
    await historyItem.checkCategoryRule();
    await historyItem.validate();

    return historyItem;
  }

  public get getHistory(): History {
    return this.history;
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

  /**
   * History의 카테고리의 규칙에 따라 History item을 추가할 수 있는지 확인
   *
   * - COMPLETED 카테고리는 FINISHED 상태인 미디어만 추가 가능
   * - CURRENT 카테고리는 FINISHED, RELEASING 상태인 미디어만 추가 가능
   * - PLANNING 카테고리는 모든 상태의 미디어를 추가 가능
   */
  private async checkCategoryRule(): Promise<void> {
    if (this.history.getCategory === HistoryCategory.COMPLETED) {
      this.completeCategoryRule();
    }
    if (this.history.getCategory === HistoryCategory.CURRENT) {
      this.currentCategoryRule();
    }
  }

  private completeCategoryRule(): void {
    const addableMediaStatus = this.media.getStatus === MediaStatus.FINISHED;

    if (!addableMediaStatus) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Only finished media can be added to COMPLETED category',
      });
    }
  }

  private currentCategoryRule(): void {
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
