import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RemoveLibraryPort } from '@core/domain/library/port/usecase/RemoveLibraryPort';

@Exclude()
export class RemoveLibraryAdapter extends UseCaseAdapter implements RemoveLibraryPort {
  @Expose()
  @IsUUID()
  public libraryId!: string;

  @Expose()
  @IsUUID()
  public userId!: string;

  public static async new(payload: RemoveLibraryPort): Promise<RemoveLibraryAdapter> {
    const adapter: RemoveLibraryAdapter = plainToClass(RemoveLibraryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
