import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RemoveHistoryPort } from '@core/domain/history/port/usecase/RemoveHistoryPort';

@Exclude()
export class RemoveHistoryAdapter extends UseCaseAdapter implements RemoveHistoryPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public historyId!: string;

  public static async new(payload: RemoveHistoryPort): Promise<RemoveHistoryAdapter> {
    const adapter: RemoveHistoryAdapter = plainToClass(RemoveHistoryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
