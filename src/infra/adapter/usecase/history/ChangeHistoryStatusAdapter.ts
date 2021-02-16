import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsEnum } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { ChangeHistoryStatusPort } from '@core/domain/history/port/usecase/ChangeHistoryStatusPort';

@Exclude()
export class ChangeHistoryStatusAdapter extends UseCaseAdapter implements ChangeHistoryStatusPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public historyId!: string;

  @Expose()
  @IsEnum(HistoryStatus)
  public status!: HistoryStatus;

  public static async new(payload: ChangeHistoryStatusPort): Promise<ChangeHistoryStatusAdapter> {
    const adapter: ChangeHistoryStatusAdapter = plainToClass(ChangeHistoryStatusAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
