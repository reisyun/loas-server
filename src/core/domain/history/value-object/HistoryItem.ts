import { IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { CreateHistoryItemValueObjectPayload } from '@core/domain/history/value-object/type/CreateHistoryItemEntityPayload';

export class HistoryItem extends ValueObject {
  @IsUUID()
  private readonly id: string;

  @IsUUID()
  private readonly mediaId: string;

  public constructor(id: string, mediaId: string) {
    super();

    this.id = id;
    this.mediaId = mediaId;
  }

  public static async new(payload: CreateHistoryItemValueObjectPayload): Promise<HistoryItem> {
    const historyItem = new HistoryItem(payload.id, payload.mediaId);
    await historyItem.validate();

    return historyItem;
  }

  public get getId(): string {
    return this.id;
  }

  public get getMediaId(): string {
    return this.mediaId;
  }
}
