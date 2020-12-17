import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsInt, IsBoolean, IsDate, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { AddCollectionItemPort } from '@core/domain/collectionItem/port/usecase/AddCollectionItemPort';

@Exclude()
export class AddCollectionItemAdapter extends UseCaseAdapter implements AddCollectionItemPort {
  @Expose()
  @IsUUID()
  public collectionId!: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  public private?: boolean;

  @Expose()
  @IsDate()
  @IsOptional()
  public completedAt?: Date;

  @Expose()
  @IsBoolean()
  @IsOptional()
  public like?: boolean;

  @Expose()
  @IsInt()
  @IsOptional()
  public repeat?: number;

  public static async new(payload: AddCollectionItemPort): Promise<AddCollectionItemAdapter> {
    const adapter: AddCollectionItemAdapter = plainToClass(AddCollectionItemAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
