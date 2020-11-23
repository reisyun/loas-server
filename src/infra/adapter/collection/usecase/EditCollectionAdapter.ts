import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { EditCollectionPort } from '@core/domain/collection/port/usecase/EditCollectionPort';

@Exclude()
export class EditCollectionAdapter extends UseCaseAdapter implements EditCollectionPort {
  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsUUID()
  public userId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public description?: string;

  public static async new(payload: EditCollectionPort): Promise<EditCollectionAdapter> {
    const adapter: EditCollectionAdapter = plainToClass(EditCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
