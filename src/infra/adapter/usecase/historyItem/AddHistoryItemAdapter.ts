import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsEnum } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';
import { AddHistoryItemPort } from '@core/domain/historyItem/port/usecase/AddHistoryItemPort';

@Exclude()
export class AddHistoryItemAdapter extends UseCaseAdapter implements AddHistoryItemPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsEnum(HistoryCategory)
  public category!: HistoryCategory;

  @Expose()
  @IsUUID()
  public mediaId!: string;

  public static async new(payload: AddHistoryItemPort): Promise<AddHistoryItemAdapter> {
    const adapter: AddHistoryItemAdapter = plainToClass(AddHistoryItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
