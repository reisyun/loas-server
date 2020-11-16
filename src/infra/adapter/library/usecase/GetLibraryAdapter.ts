import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetLibraryPort } from '@core/domain/library/port/usecase/GetLibraryPort';

@Exclude()
export class GetLibraryAdapter extends UseCaseAdapter implements GetLibraryPort {
  @Expose()
  @IsUUID()
  @IsOptional()
  public libraryId?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  public userId?: string;

  public static async new(payload: GetLibraryPort): Promise<GetLibraryAdapter> {
    const adapter: GetLibraryAdapter = plainToClass(GetLibraryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
