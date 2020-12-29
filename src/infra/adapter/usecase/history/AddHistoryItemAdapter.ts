import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { AddHistoryItemPort } from '@core/domain/history/port/usecase/AddHistoryItemPort';

@Exclude()
export class AddHistoryItemAdapter extends UseCaseAdapter implements AddHistoryItemPort {
  @Expose()
  @IsUUID()
  public historyId!: string;

  @Expose()
  @IsUUID()
  public mediaId!: string;

  public static async new(payload: AddHistoryItemPort): Promise<AddHistoryItemAdapter> {
    const adapter: AddHistoryItemAdapter = plainToClass(AddHistoryItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
