import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsBoolean } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';

@Exclude()
export class RemoveUserAdapter extends UseCaseAdapter implements RemoveUserPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsBoolean()
  public confirm!: boolean;

  public static async new(payload: RemoveUserPort): Promise<RemoveUserAdapter> {
    const adapter: RemoveUserAdapter = plainToClass(RemoveUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
