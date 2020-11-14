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
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @Expose()
  @IsEnum(Language)
  @IsOptional()
  language?: Language;

  @Expose()
  @IsString()
  @IsOptional()
  shortBio?: string;

  @Expose()
  @IsString()
  @IsOptional()
  avatar?: string;

  public static async new(payload: CreateProfilePort): Promise<CreateProfileAdapter> {
    const adapter: CreateProfileAdapter = plainToClass(CreateProfileAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
