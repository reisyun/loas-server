import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { Gender, Language } from '@core/domain/profile/entity/Profile';
import { EditProfilePort } from '@core/domain/profile/port/usecase/EditProfilePort';

@Exclude()
export class EditProfileAdapter extends UseCaseAdapter implements EditProfilePort {
  @Expose()
  @IsNumber()
  public profileId!: number;

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

  public static async new(payload: EditProfilePort): Promise<EditProfileAdapter> {
    const adapter: EditProfileAdapter = plainToClass(EditProfileAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
