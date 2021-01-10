import { IsInt, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { CreateHistoryItemValueObjectPayload } from '@core/domain/history/value-object/type/CreateHistoryItemEntityPayload';

export class HistoryItem extends ValueObject {
  @IsUUID()
  private readonly mediaId;

  @IsInt()
  private repeat: number;

  @IsBoolean()
  private private: boolean;

  @IsDate()
  private completedAt: Date;

  public constructor(mediaId: string, repeat?: number, isPrivate?: boolean, completedAt?: Date) {
    super();

    this.mediaId = mediaId;

    this.repeat = repeat ?? 0;
    this.private = isPrivate ?? false;
    this.completedAt = completedAt ?? new Date();
  }

  public static async new(payload: CreateHistoryItemValueObjectPayload): Promise<HistoryItem> {
    const historyItem = new HistoryItem(
      payload.mediaId,
      payload.repeat,
      payload.private,
      payload.completedAt,
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
}
