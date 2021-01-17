import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RemoveHistoryItemPort } from '@core/domain/historyItem/port/usecase/RemoveHistoryItemPort';

@Exclude()
export class RemoveHistoryItemAdapter extends UseCaseAdapter implements RemoveHistoryItemPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public historyItemId!: string;

  public static async new(payload: RemoveHistoryItemPort): Promise<RemoveHistoryItemAdapter> {
    const adapter: RemoveHistoryItemAdapter = plainToClass(RemoveHistoryItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
