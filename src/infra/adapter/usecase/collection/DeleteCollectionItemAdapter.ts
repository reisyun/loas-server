import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { DeleteCollectionItemPort } from '@core/domain/collection/port/usecase/DeleteCollectionItemPort';

@Exclude()
export class DeleteCollectionItemAdapter
  extends UseCaseAdapter
  implements DeleteCollectionItemPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsUUID()
  public mediaId!: string;

  public static async new(payload: DeleteCollectionItemPort): Promise<DeleteCollectionItemAdapter> {
    const adapter: DeleteCollectionItemAdapter = plainToClass(DeleteCollectionItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
