import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { CreateLibraryPort } from '@core/domain/library/port/usecase/CreateLibraryPort';

@Exclude()
export class CreateLibraryAdapter extends UseCaseAdapter implements CreateLibraryPort {
  @Expose()
  @IsUUID()
  public userId!: string;

  @Expose()
  @IsString()
  public name!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public description?: string;

  @Expose()
  @IsBoolean()
  public private!: boolean;

  public static async new(payload: CreateLibraryPort): Promise<CreateLibraryAdapter> {
    const adapter: CreateLibraryAdapter = plainToClass(CreateLibraryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
