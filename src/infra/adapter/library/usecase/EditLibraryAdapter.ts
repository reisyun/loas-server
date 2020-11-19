import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { EditLibraryPort } from '@core/domain/library/port/usecase/EditLibraryPort';

@Exclude()
export class EditLibraryAdapter extends UseCaseAdapter implements EditLibraryPort {
  @Expose()
  @IsUUID()
  public libraryId!: string;

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

  @Expose()
  @IsBoolean()
  @IsOptional()
  public private?: boolean;

  public static async new(payload: EditLibraryPort): Promise<EditLibraryAdapter> {
    const adapter: EditLibraryAdapter = plainToClass(EditLibraryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
