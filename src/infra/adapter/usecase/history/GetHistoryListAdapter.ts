import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { GetHistoryListPort } from '@core/domain/history/port/usecase/GetHistoryListPort';

@Exclude()
export class GetHistoryListAdapter extends UseCaseAdapter implements GetHistoryListPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  public ownerId?: string;

  @Expose()
  @IsEnum(HistoryStatus)
  @IsOptional()
  public status?: HistoryStatus;

  public static async new(payload: GetHistoryListPort): Promise<GetHistoryListAdapter> {
    const adapter: GetHistoryListAdapter = plainToClass(GetHistoryListAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
