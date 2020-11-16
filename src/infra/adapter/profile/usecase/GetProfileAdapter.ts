import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsNumber, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetProfilePort } from '@core/domain/profile/port/usecase/GetProfilePort';

@Exclude()
export class GetProfileAdapter extends UseCaseAdapter implements GetProfilePort {
  @Expose()
  @IsNumber()
  @IsOptional()
  public profileId?: number;

  @Expose()
  @IsUUID()
  @IsOptional()
  public userId?: string;

  public static async new(payload: GetProfilePort): Promise<GetProfileAdapter> {
    const adapter: GetProfileAdapter = plainToClass(GetProfileAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
