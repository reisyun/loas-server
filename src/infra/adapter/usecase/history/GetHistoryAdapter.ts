import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsEnum } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { GetHistoryPort } from '@core/domain/history/port/usecase/GetHistoryPort';

@Exclude()
export class GetHistoryAdapter extends UseCaseAdapter implements GetHistoryPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsEnum(HistoryCategory)
  public category!: HistoryCategory;

  public static async new(payload: GetHistoryPort): Promise<GetHistoryAdapter> {
    const adapter: GetHistoryAdapter = plainToClass(GetHistoryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
