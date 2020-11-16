import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { Gender, Language } from '@core/domain/profile/entity/Profile';
import { CreateProfilePort } from '@core/domain/profile/port/usecase/CreateProfilePort';

@Exclude()
export class CreateProfileAdapter extends UseCaseAdapter implements CreateProfilePort {
  @Expose()
  @IsUUID()
  public userId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public shortBio?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public avatar?: string;

  @Expose()
  @IsEnum(Gender)
  @IsOptional()
  public gender?: Gender;

  @Expose()
  @IsEnum(Language)
  @IsOptional()
  public language?: Language;

  public static async new(payload: CreateProfilePort): Promise<CreateProfileAdapter> {
    const adapter: CreateProfileAdapter = plainToClass(CreateProfileAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
