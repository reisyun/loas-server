import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { Category } from '@core/domain/collection/entity/Collection';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';

@Exclude()
export class CreateCollectionAdapter extends UseCaseAdapter implements CreateCollectionPort {
  @Expose()
  @IsUUID()
  public collectorId!: string;

  @Expose()
  @IsString()
  public name!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public description?: string;

  @Expose()
  @IsEnum(Category)
  @IsOptional()
  public category?: Category;

  public static async new(payload: CreateCollectionPort): Promise<CreateCollectionAdapter> {
    const adapter: CreateCollectionAdapter = plainToClass(CreateCollectionAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}