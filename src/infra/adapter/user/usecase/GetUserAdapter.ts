import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsEmail, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';

@Exclude()
export class GetUserAdapter extends UseCaseAdapter implements GetUserPort {
  @Expose()
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  public email?: string;

  public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToClass(GetUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
