import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsEmail, MinLength } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';

@Exclude()
export class CreateUserAdapter extends UseCaseAdapter implements CreateUserPort {
  @Expose()
  @IsString()
  public name!: string;

  @Expose()
  @IsEmail()
  public email!: string;

  @Expose()
  @IsString()
  @MinLength(6)
  public password!: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
