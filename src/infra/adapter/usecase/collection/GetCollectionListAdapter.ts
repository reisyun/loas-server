import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetCollectionListPort } from '@core/domain/collection/port/usecase/GetCollectionListPort';

@Exclude()
export class GetCollectionListAdapter extends UseCaseAdapter implements GetCollectionListPort {
  @Expose()
  @IsUUID()
  @IsOptional()
  public collectorId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public name?: string;

  public static async new(payload: GetCollectionListPort): Promise<GetCollectionListAdapter> {
    const adapter: GetCollectionListAdapter = plainToClass(GetCollectionListAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
