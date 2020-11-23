import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';

@Exclude()
export class RestoreCollectionAdapter extends UseCaseAdapter implements RestoreCollectionPort {
  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsUUID()
  public userId!: string;

  public static async new(payload: RestoreCollectionPort): Promise<RestoreCollectionAdapter> {
    const adapter: RestoreCollectionAdapter = plainToClass(RestoreCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
