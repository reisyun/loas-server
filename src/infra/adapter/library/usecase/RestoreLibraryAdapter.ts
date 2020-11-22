import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RestoreLibraryPort } from '@core/domain/library/port/usecase/RestoreLibraryPort';

@Exclude()
export class RestoreLibraryAdapter extends UseCaseAdapter implements RestoreLibraryPort {
  @Expose()
  @IsUUID()
  public libraryId!: string;

  @Expose()
  @IsUUID()
  public userId!: string;

  public static async new(payload: RestoreLibraryPort): Promise<RestoreLibraryAdapter> {
    const adapter: RestoreLibraryAdapter = plainToClass(RestoreLibraryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
