import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsBoolean, IsDate, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { CreateHistoryPort } from '@core/domain/history/port/usecase/CreateHistoryPort';

@Exclude()
export class CreateHistoryAdapter extends UseCaseAdapter implements CreateHistoryPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public mediaId!: string;

  @Expose()
  @IsEnum(HistoryStatus)
  public status!: HistoryStatus;

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

  public static async new(payload: CreateHistoryPort): Promise<CreateHistoryAdapter> {
    const adapter: CreateHistoryAdapter = plainToClass(CreateHistoryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
