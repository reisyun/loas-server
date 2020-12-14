import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';

@Exclude()
export class GetCollectionAdapter extends UseCaseAdapter implements GetCollectionPort {
  @Expose()
  @IsUUID()
  @IsOptional()
  public collectionId?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  public collectorId?: string;

  public static async new(payload: GetCollectionPort): Promise<GetCollectionAdapter> {
    const adapter: GetCollectionAdapter = plainToClass(GetCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
