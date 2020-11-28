import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RemoveCollectionPort } from '@core/domain/collection/port/usecase/RemoveCollectionPort';

@Exclude()
export class RemoveCollectionAdapter extends UseCaseAdapter implements RemoveCollectionPort {
  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsUUID()
  public collectorId!: string;

  public static async new(payload: RemoveCollectionPort): Promise<RemoveCollectionAdapter> {
    const adapter: RemoveCollectionAdapter = plainToClass(RemoveCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
