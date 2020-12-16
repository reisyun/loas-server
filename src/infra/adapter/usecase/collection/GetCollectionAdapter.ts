import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';

@Exclude()
export class GetCollectionAdapter extends UseCaseAdapter implements GetCollectionPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public collectionId!: string;

  public static async new(payload: GetCollectionPort): Promise<GetCollectionAdapter> {
    const adapter: GetCollectionAdapter = plainToClass(GetCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
