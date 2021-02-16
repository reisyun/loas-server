import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsBoolean, IsDate, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { EditHistoryPort } from '@core/domain/history/port/usecase/EditHistoryPort';

@Exclude()
export class EditHistoryAdapter extends UseCaseAdapter implements EditHistoryPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public historyId!: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  public repeat?: number;

  @Expose()
  @IsBoolean()
  @IsOptional()
  public secret?: boolean;

  @Expose()
  @IsDate()
  @IsOptional()
  public completedAt?: Date;

  public static async new(payload: EditHistoryPort): Promise<EditHistoryAdapter> {
    const adapter: EditHistoryAdapter = plainToClass(EditHistoryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
