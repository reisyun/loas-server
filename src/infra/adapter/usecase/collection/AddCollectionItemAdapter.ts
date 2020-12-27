import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsInt } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { AddCollectionItemPort } from '@core/domain/collection/port/usecase/AddCollectionItemPort';

@Exclude()
export class AddCollectionItemAdapter extends UseCaseAdapter implements AddCollectionItemPort {
  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsInt()
  public mediaId!: number;

  public static async new(payload: AddCollectionItemPort): Promise<AddCollectionItemAdapter> {
    const adapter: AddCollectionItemAdapter = plainToClass(AddCollectionItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
