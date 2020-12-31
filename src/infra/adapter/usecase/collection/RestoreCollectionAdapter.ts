import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';

@Exclude()
export class RestoreCollectionAdapter extends UseCaseAdapter implements RestoreCollectionPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public collectionId!: string;

  public static async new(payload: RestoreCollectionPort): Promise<RestoreCollectionAdapter> {
    const adapter: RestoreCollectionAdapter = plainToClass(RestoreCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
