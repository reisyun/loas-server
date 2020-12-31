import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID, MinLength } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { ChangeUserPasswordPort } from '@core/domain/user/port/usecase/ChangeUserPasswordPort';

@Exclude()
export class ChangeUserPasswordAdapter extends UseCaseAdapter implements ChangeUserPasswordPort {
  @Expose()
  @IsUUID()
  public executorId!: string;

  @Expose()
  @IsString()
  @MinLength(6)
  public oldPassword!: string;

  @Expose()
  @IsString()
  @MinLength(6)
  public newPassword!: string;

  public static async new(payload: ChangeUserPasswordPort): Promise<ChangeUserPasswordAdapter> {
    const adapter: ChangeUserPasswordAdapter = plainToClass(ChangeUserPasswordAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
